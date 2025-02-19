const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");
const { Ball } = require('./shared');
const Matter = require('matter-js');

const BASE_PATH = '';
const PORT = 8080;

let tick = 0;

const db = require('./db');

db.connect();

const app = express();
app.use(bodyParser.json());
app.use(`${BASE_PATH}/`, express.static('dist'));
const server = http.createServer(app);

const io = new Server(server, { path: `${BASE_PATH}/socket.io` });

let physics = Matter.Engine.create();
physics.gravity = Matter.Vector.create(0, 0.1);
Matter.Common.setDecomp(require('poly-decomp'));
Matter.Resolver._restingThresh = 0.01;

let physicsLevels = {};

let levels = require('./levels.json');

let players = {}

io.on('connection', async (socket, data) => {

    let id = socket.handshake.query.id;

    let dbBall = await db.getBall(id);

    if (!dbBall.exists) {
        socket.emit('accept', { success: false, error: "your progress couldn't be loaded on the server! (if this doesn't resolve, clear your local storage)"});
        return;
    }

    if (!!players[id]) {
        socket.emit('accept', { success: false, error: "you are already playing on the server!"});
        return;
    }

    let ball = dbBall.ball;
    let newBall = new Ball(ball._id);

    newBall.name = ball.name;
    newBall.color = ball.color;
    newBall.score = ball.score;
    newBall.clears = ball.clears;
    newBall.level = ball.level;

    newBall.onTee = true;

    let newBallLevel = levels[newBall.level];

    let physicsBody = Matter.Bodies.circle(newBallLevel.x + newBallLevel.holeX, newBallLevel.holeY, 0.5, {friction: 0.02, frictionAir: 0, restitution: 0.4});
    Matter.Composite.add(physics.world, physicsBody);

    players[socket.id] = {
        socketId: socket.id,
        socket,
        ball: newBall,
        physicsBody
    }

    socket.emit('accept', { success: true, username: newBall.name});
    sendChatMessage(newBall.name + ' joined', [255, 255, 0]);
    sendPlayerLevels(socket);

    socket.on('disconnect', async () => {
        let player = players[socket.id];
        if (!player) {
            socket.emit('reload');
            return;
        }

        sendChatMessage(player.ball.name + ' left', [255, 255, 0]);
        
        await savePlayer(socket.id, player.ball.id);

        Matter.Composite.remove(physics.world, player.physicsBody);

        delete players[socket.id];

        await db.updateDatabase();
        
    });

    socket.on('aim_input', (data) => {
        let player = players[socket.id];
        if (!player) {
            socket.emit('reload');
            return;
        }
        
        player.ball.aiming = true;

        player.ball.aimX = data.aimX + levels[player.ball.level + 1].x - 20;
        player.ball.aimY = data.aimY;

        player.ball.aimVelX = data.aimVelX;
        player.ball.aimVelY = data.aimVelY;

        player.ball.aimPower = data.aimPower;
    });

    socket.on('stroke', (data) => {
        let player = players[socket.id];
        if (!player) {
            socket.emit('reload');
            return;
        }

        player.ball.aiming = false;

        if (!player.ball.canStroke || player.ball.trans >= 0) {
            return;
        }

        let len = Math.sqrt(data.aimVelX * data.aimVelX + data.aimVelY * data.aimVelY);
        let vx = len > 0 ? data.aimVelX / len : 0;
        let vy = len > 0 ? data.aimVelY / len : 0;

        let p = Math.min(data.aimPower, 1);

        if (len > 0 && p > 0.05) {
            player.physicsBody.isStatic = false;

            player.ball.score += 1;
            player.ball.canStroke = false;

            player.ball.onTee = false;

            Matter.Body.applyForce(player.physicsBody, player.physicsBody.position, Matter.Vector.create(-vx * p * 0.00001, -vy * p * 0.00001));
        }
    });

    socket.on('chat_request', (data) => {
        let player = players[socket.id];
        if (!player) {
            socket.emit('reload');
            return;
        }
        
        if (player.ball.lastChat > tick - 20) {
            sendChatMessageTo(socket, 'please wait before sending another message!', [200, 200, 200]);
        } else {
            player.ball.lastChat = tick;
            let m = data.message.trim()
            if (m.length > 0) {
                if (m[0] == '/') {
                    let args = m.substring(1).split(' ');
                    if (args.length == 1 && (args[0] == 'reset' || args[0] == 'r')) {
                        resetPlayer(socket.id);
                        sendChatMessageTo(socket, 'you reset yourself', [200, 200, 200]);
                    } else if (args.length == 1 && args[0] == 'help') {
                        sendChatMessageTo(socket, 'command help:', [200, 200, 200]);
                        sendChatMessageTo(socket, '/reset or /r - resets your ball', [200, 200, 200]);
                    } else if (false && args.length == 2 && args[0] == 'tp') {
                        teleportPlayer(socket.id, parseInt(args[1]))
                        sendChatMessageTo(socket, 'teleported you to level ' + args[1], [200, 200, 200]);
                    } else if (false && args.length == 1 && args[0] == 'tptest') {
                        player.ball.tpTick = 0;
                        sendChatMessage('starting tp test!', player.ball.color);
                    } else if (false && args.length == 1 && args[0] == 'autosave') {
                        autoSave();
                    } else {
                        sendChatMessageTo(socket, 'invalid command!', [255, 0, 0]);
                    }
                } else {
                    sendChatMessage(player.ball.name + ': ' + (m.length < 64 ? m: m.substring(0, 64)), player.ball.color);
                }
            }
        }
        
    });
});

function sendChatMessage(message, color) {
    io.emit('chat', {
        message,
        color,
        tick
    });
}

function sendChatMessageTo(socket, message, color) {
    socket.emit('chat', {
        message,
        color,
        tick
    });
}

app.post(`${BASE_PATH}/new_ball`, async (req, res) => {
    let username = req.body.username || "anotherball" + Math.floor(Math.random() * 10000000);
    if (username.length > 16) {
        username = username.substring(0, 16);
    }
    
    let ballQuery = await db.newBall(username);
    if (!ballQuery.success) {
        res.send(ballQuery);
        return;
    }

    res.send({
        success: true,
        id: ballQuery.newBall._id,
    });
});

app.get(`${BASE_PATH}/test`, (req, res) => {
    res.send('Hello World!');
});

server.listen(process.env.PORT || PORT, async () => {
  console.log('server up and running');

  await db.updateDatabase();

  for (let i = 0; i < 100; i++) {
    fixLevelStats(i);
  }

  setInterval(serverTick, 50);
});

async function savePlayer(socketId, id) {
    let ball = (await db.getBall(id)).ball;
    let player = players[socketId];

    ball.time = player.ball.time;
    ball.score = player.ball.score;
    ball.clears = player.ball.clears;
    ball.level = player.ball.level;

    await ball.save();
}

async function autoSave() {
    sendChatMessage('autosaving, expect lag...', [200, 200, 200]);
    for (let socketId in players) {
        let player = players[socketId];
        await savePlayer(socketId, player.ball.id);
    }
    
    await db.updateDatabase();
    sendChatMessage('autosave complete!', [200, 200, 200]);
}

function sendPlayerLevels(socket) {
    let player = players[socket.id];
    let playerLevels = [];
    for (let i = 0; i < 4; i++) {
        let level = levels[player.ball.level + i];
        if (level != undefined) {
            playerLevels.push(level);
        }
    }
    socket.emit('levels', {levels: playerLevels});
}

function fixPhysicsLevels(debug) {
    let currentLevels = [];

    for (let socketId in players) {
        let player = players[socketId];
        currentLevels.push(player.ball.level);
    }
    
    for (let level in physicsLevels) {
        for (let current of currentLevels) {
            if (level < current || level > current + 3) {
                if (physicsLevels[level]) {
                    Matter.Composite.remove(physics.world, physicsLevels[level]);
                    delete physicsLevels[level];
                }
            }
        }
    }

    for (let current of currentLevels) {
        for (let i = 0; i < 4; i++) {
            let index = current + i
            if (!physicsLevels[index]) {
                let level = levels[index];
                if (level) {
                    let vertices = [...level.points];
                    vertices.push({x: level.width, y: 100});
                    vertices.push({x: 0, y: 100});

                    physicsLevels[index] = Matter.Bodies.fromVertices(0, 0, vertices, {friction: 0.02, isStatic: true}, false, 0.01, 0.1, 0.01);
                    if (!physicsLevels[index]) {
                        console.log(vertices);
                        console.log('level was undefined!' + level.id);
                        
                        // sendChatMessage('LEVEL FAILED: ' + level.id, [255, 0, 0]);
                        continue;
                    }

                    Matter.Composite.add(physics.world, physicsLevels[index]);


                    let minX = 99999999999999, minY = 99999999999999;
                    for (let p of physicsLevels[index].parts) {
                        for (let v of p.vertices) {
                            minX = Math.min(v.x, minX);
                            minY = Math.min(v.y, minY);
                        }
                    }
                
                    Matter.Body.translate(physicsLevels[index], Matter.Vector.create(-minX, -minY));

                    maxY = -99999999999999;
                    for (let p of physicsLevels[index].parts) {
                        for (let v of p.vertices) {
                            maxY = Math.max(v.y, maxY);
                        }
                    }
                    Matter.Body.translate(physicsLevels[index], Matter.Vector.create(level.x, (100 - maxY)));

                }
            }
        }
    }

}

async function fixLevelStats(id) {
    let level = levels[(id + 1) * 100];

    let allBalls = await db.allBalls();

    let balls = {};
    for (let ball of allBalls) {
        balls[ball.id] = ball;
    }

    for (let socketId in players) {
        let ball = players[socketId].ball;
        balls[ball.id] = ball;        
    }

    let keys = Object.keys(balls).filter((key) => {
        return balls[key].clears[id][0] < Infinity && balls[key].clears[id][1] < Infinity;
    });

    if (keys.length > 0) {
        
        let sortedByScore = [...keys].sort((a, b) => {
            return balls[a].score - balls[b].score;
        });
    
        let sortedByTime = [...keys].sort((a, b) => {
            return balls[a].time - balls[b].time;
        });
    
        level.stats = {sortedByScore, sortedByTime};

    }

    
}

function resetPlayer(id) {
    let player = players[id];
    player.ball.wasReset = true;
    player.ball.onTee = true;
    teePlayer(id);
}

function teePlayer(id) {
    let player = players[id];
    let level = levels[player.ball.level];
    Matter.Body.setPosition(player.physicsBody, Matter.Vector.create(level.x + level.holeX, level.holeY));
    freezePlayer(id);
}

function freezePlayer(id) {
    let player = players[id];
    Matter.Body.setVelocity(player.physicsBody, Matter.Vector.create(0, 0));
    Matter.Body.setAngularVelocity(player.physicsBody, 0);
}

function teleportPlayer(id, level) {
    let player = players[id];
    player.ball.onTee = true;
    player.ball.canStroke = true;
    player.ball.level = level;
    sendPlayerLevels(player.socket);
}

async function serverTick() {
    let allBalls = await db.allBalls();

    fixPhysicsLevels();

    for (let i = 0; i < 5; i++) {
        Matter.Engine.update(physics, 10);
    }
    

    let balls = {};
    for (let ball of allBalls) {
        balls[ball.id] = {
            online: false,
            ball
        }
    }

    for (let socketId in players) {
        let player = players[socketId];
        player.ball.time += 0.05;

        player.ball.wasReset = false;

        let level = levels[player.ball.level];
        let attemptingLevel = levels[player.ball.level + 1];

        if (player.ball.onTee) {
            teePlayer(socketId);
        }

        player.ball.x = player.physicsBody.position.x;
        player.ball.y = player.physicsBody.position.y;

        player.ball.rotation = player.physicsBody.angle;
        
        player.ball.canStroke = Math.abs(player.physicsBody.velocity.x) < 0.004 && Math.abs(player.physicsBody.velocity.y) < 0.004;

        if (player.ball.tpTick >= 0) {
            teleportPlayer(socketId, player.ball.tpTick)
            player.ball.tpTick += 1;
            if (player.ball.tpTick == 10000) {
                player.ball.tpTick = -1;
            }
        }

        if (player.ball.canStroke) {
            player.physicsBody.isStatic = true;

        }
        if (player.ball.canStroke && (player.ball.x < attemptingLevel.x - 21 || player.ball.x > attemptingLevel.x + 181)) {
            resetPlayer(socketId);
        }

        if (player.ball.x < attemptingLevel.x - 200 || player.ball.x > attemptingLevel.x + 300 || player.ball.y < -200 || player.ball.y > 99) {
            resetPlayer(socketId);
        } 
        
        if (player.ball.trans < 0 && player.ball.canStroke && Math.sqrt(Math.pow(attemptingLevel.holeX + attemptingLevel.x - player.ball.x, 2) + Math.pow(attemptingLevel.holeY + 2 - player.ball.y, 2)) < 1) {
            player.ball.trans = 40;
        }

        if (player.ball.trans >= 0) {
            player.ball.trans -= 1;
            player.ball.canStroke = false;

            if (player.ball.trans < 0) {
                player.ball.onTee = true;
                player.ball.canStroke = true;
                player.ball.level += 1;
                if (player.ball.level % 100 == 0) {
                    sendChatMessage(player.ball.name + ' cleared hole ' + player.ball.level + '!', [0, 255, 0]);
                    let lindex = Math.floor(player.ball.level / 100) - 1;
                    player.ball.clears[lindex] = [player.ball.score, player.ball.time];
                    await fixLevelStats(lindex);
                }
                sendPlayerLevels(player.socket);
            }
        }

        balls[player.ball.id] = {
            online: true,
            ball: player.ball
        }
    }

    let sortedBalls = Object.keys(balls).sort((a, b) => {
        let off = balls[b].ball.level - balls[a].ball.level
        return off != 0 ? off : (balls[a].ball.score - balls[b].ball.score);
    });

    if (tick % 10000 == 0) {
        await autoSave();
    }

    io.emit('world', {
        balls,
        sortedBalls,
        tick,
    });

    tick++;
}