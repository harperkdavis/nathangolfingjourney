
let game = {
    username: undefined,
    connected: false,
    started: false,

    socket: undefined,
    id: undefined,
    levels: undefined,

    world: undefined,
    selfBall: undefined,
    worldUpdateTime: 0,
    prevWorld: undefined,

    chat: [],
    chatting: false,

    input: {}
};

let temp = {}

let assets = {
    font: undefined,
    sfx: {}
}

const constant = {
    adjectives: ['fortunate', 'bewildering', 'long', 'merciless', 'determined', 'painless', 'long long long', 'cautious', 'depressing', 'thoughtful', 'courageous', 'optimistic', 'exuberant', 'difficult', 'confusing', 'quick', 'cheerful', 'hopeless', 'glorious', 'short', 'charming', 'confusing', 'lonely', 'unknown', 'painful', 'unfortunate', 'infinite', 'difficult', 'comfortable', 'dull', 'elegant', 'perfect']
}

let SCALE = 1, OFFSET_X = 0, OFFSET_Y = 0;

function preload() {
    assets.font = loadFont('static/koubit_001.ttf');
    assets.sfx.complete = loadSound('static/sfx/complete.wav');
    assets.sfx.hit = loadSound('static/sfx/hit.wav');
    assets.sfx.land = loadSound('static/sfx/land.wav');
    assets.sfx.pass = loadSound('static/sfx/pass.wav');
    assets.sfx.reset = loadSound('static/sfx/reset.wav');
    assets.sfx.score = loadSound('static/sfx/score.wav');
}

async function setup() {

textFont(assets.font);

createCanvas(1, 1);
windowResized();

}

function isLoggedIn() {
    return !!localStorage.getItem('nathan_golfing_journey_id');
}

function getAdjective() {
    let adj = localStorage.getItem('nathan_golfing_journey_adjective');
    if (adj == undefined) {
        return undefined;
    }
    return constant.adjectives[parseInt(adj)];
}

async function connectNew(username) {
    let json = await axios.post('/new_ball', {
        username
    }).then(res => res.data);

    if (!json.success) {
        temp.usernameFailReason = json.error || 'unknown error';
        temp.attemptingToSignUp = false;
        return;
    } 

    localStorage.setItem('nathan_golfing_journey_id', json.id);
}

async function connect() {
    if (!localStorage.getItem('nathan_golfing_journey_id')) {
        return false;
    }

    id = localStorage.getItem('nathan_golfing_journey_id');

    game.levels = [];
    game.chat = [];
    game.world = {};
    game.prevWorld = {};

    temp.played = {};

    game.input = {
        aiming: false,
        aimX: 0,
        aimY: 0,
        aimVelX: 0,
        aimVelY: 0,
        aimPower: 0,
    }

    game.socket = io({query: "id=" + id});

    game.socket.on('accept', (data) => {

        if (!data.success) {
            temp.connectionError = data.error;
            return;
        }

        game.username = data.username;
        game.connected = true;

    });

    game.socket.on('levels', (data) => {

        game.levels = data.levels;

    });

    game.socket.on('world', (data) => {

        game.prevWorld = {...game.world};
        game.world = data;
        game.worldUpdateTime = Date.now();

        temp.played = {};

        if (game.world.balls[id] && game.world.balls[id].ball) {
            game.selfBall = game.world.balls[id].ball;
        }

        game.chat = game.chat.filter((message) => {
            return message.tick > game.world.tick - 200;
        })
        
    });

    game.socket.on('chat', (data) => {
        game.chat.unshift(data);
    });

    game.socket.on('reload', async (data) => {
        game.socket.disconnect();
        await connect();
    });

    return true;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    SCALE = min(width / 200, height / 100);
    OFFSET_X = max(0, width / 200 - height / 100) * 100;
    OFFSET_Y = max(0, height / 100 - width / 200) * 50;
}

function keyTyped() {
    if (!game.started) {
        if (getAdjective()) {
            if (temp.usernameTyped == undefined) {
                temp.usernameTyped = "";
            }
    
            if (key != 'Enter' && temp.usernameTyped.length <= 16) {
                temp.usernameTyped += key;
            }
            
        }
        return
    }
    
    if (game.chatting) {
        if (temp.typing.length < 63 && key != 'Enter') {
            temp.typing += key;
        }
    }
    
}

function keyPressed() {
    if (!game.started) {
        if (getAdjective()) {
            if (temp.usernameTyped == undefined) {
                temp.usernameTyped = "";
            }

            if (keyCode == BACKSPACE) {
                if(temp.usernameTyped.length > 0) {
                    temp.usernameTyped = temp.usernameTyped.substring(0, temp.usernameTyped.length - 1);
                }
            }
            if (keyCode == ENTER) {
                if (!temp.attemptingToSignUp) {
                    let trimmed = temp.usernameTyped.trim();
                    if (trimmed.length > 0) {
                        temp.attemptingToSignUp = true;
                        connectNew(trimmed);
                    }
                }
            }
        }

        return;
    }

    if (keyCode == ESCAPE) {
        game.chatting = false;
        temp.typing = "";
    }
    if (keyCode == ENTER) {
        if (game.chatting) {
            game.chatting = false;
            if (temp.typing.trim().length > 0) {
                game.socket.emit('chat_request', {message: temp.typing});
            }
            
        } else {
            game.chatting = true;
            temp.typing = "";
        }
    }
    if (keyCode == BACKSPACE) {
        if (game.chatting) {
            if(temp.typing.length > 0) {
                temp.typing = temp.typing.substring(0, temp.typing.length - 1);
            }
        }
    }
}

function mousePressed() {
    userStartAudio();

    if (!game.started) {
        return;
    }

    game.input.aiming = true;

    game.input.aimX = (mouseX - OFFSET_X) / SCALE;
    game.input.aimY = (mouseY - OFFSET_Y) / SCALE;
}

function mouseReleased() {
    if (!game.started) {
        return;
    }

    if (game.input.aiming) {
        game.socket.emit('stroke', game.input);
        assets.sfx.hit.play();
    }

    game.input.aiming = false;
}

function update() {
    
    if (game.input.aiming) {
        let aimMouseX = (mouseX - OFFSET_X) / SCALE;
        let aimMouseY = (mouseY - OFFSET_Y) / SCALE;

        let aimLength = sqrt(pow(game.input.aimX - aimMouseX, 2) + pow(game.input.aimY - aimMouseY, 2));

        game.input.aimVelX = aimLength > 0 ? (aimMouseX - game.input.aimX) / aimLength : 0;
        game.input.aimVelY = aimLength > 0 ? (aimMouseY - game.input.aimY) / aimLength : 0;

        game.input.aimPower = min(pow(aimLength / 40, 1), 1);

        game.socket.emit('aim_input', game.input);
    }

    if (game.selfBall) {
        if (game.selfBall.wasReset) {
            if (!temp.played.reset) {
                temp.played.reset = true;
                assets.sfx.reset.stop();
                assets.sfx.reset.play();
            }
        }
        if (game.selfBall.trans == 39) {
            if (!temp.played.complete) {
                temp.played.complete = true;
                assets.sfx.complete.stop();
                assets.sfx.complete.play();
            }
        } else if (game.selfBall.trans == 1) {
            if (!temp.played.pass) {
                temp.played.pass = true;
                assets.sfx.pass.stop();
                assets.sfx.pass.play();
            }
        }
    }

}

function drawLevel(level, offset) {

    let gaps = [];

    colorMode(HSB, 255);
    fill((level.id / 10000 * 1000) % 255, lerp(0, 255, min((5000 - Math.abs(level.id - 5000)) / 4000, 1)), 200);
    colorMode(RGB, 255);
    noStroke();

    beginShape();

    for (let v of level.points) {
        vertex((v.x + offset) * SCALE, v.y * SCALE);
        if (v.y > 99) {
            gaps.push(v.x + offset);
        }
    }

    vertex((level.width + offset) * SCALE, 1000 * SCALE);
    vertex(offset * SCALE, 1000 * SCALE);

    endShape(CLOSE);
    
    stroke(0);
    noFill();

    beginShape();
    for (let v of level.points) {
        vertex((v.x + offset) * SCALE, v.y * SCALE);
    }
    endShape();

    fill(50, 150, 230);
    for (let i = 0; i < gaps.length / 2 + 1; i += 2) {
        let g1 = gaps[i];
        let g2 = gaps[i + 1];

        rect(g1 * SCALE, 98 * SCALE, (g2 - g1) * SCALE, 1000 * SCALE);
    }

}

function drawLevelFlag(level, offset) {
    if (game.selfBall) {
        if (game.selfBall.level + 1 == level.id) {
            
            textSize(SCALE * 4);
            textAlign(LEFT, TOP);
            let w = textWidth(level.id);

            stroke(0);
            fill(250, 250, 200);

            beginShape();
            vertex((level.holeX + offset + 1.83) * SCALE, (level.holeY - 5) * SCALE);
            vertex((level.holeX + offset + 2.5) * SCALE + w, (level.holeY - 5) * SCALE);
            vertex((level.holeX + offset + 3) * SCALE + w, (level.holeY - 4) * SCALE);
            vertex((level.holeX + offset + 2.5) * SCALE + w, (level.holeY - 3) * SCALE);
            vertex((level.holeX + offset + 1.83) * SCALE, (level.holeY - 3) * SCALE);
            endShape();

            noStroke();
            fill(100);
            text(level.id, (level.holeX + offset + 2.5) * SCALE, (level.holeY - 6) * SCALE)

            stroke(0);
            fill(150);
            rect((level.holeX + offset + 1.33) * SCALE, (level.holeY - 5) * SCALE, 0.5 * SCALE, 5 * SCALE);
        }
        
    }
}

function drawLevelStats(level, offset) {
    if (game.selfBall) {
        if (game.selfBall.level == level.id) {
            if (level.stats) {
                
                let posY = level.holeY + 5;
                let posX = level.holeX + offset;
                if (level.holeY > 50) {
                    posY = level.holeY + 5;
                }

                noStroke();
                fill(0);
                textSize(3 * SCALE);
                textAlign(LEFT, TOP);
                text('strokes', posX * SCALE, posY * SCALE);
                text('time', (posX + 30) * SCALE, posY * SCALE);
                
                console.log(level.stats.sortedByTime);
                for (let i = 0; i < 10; i++) {
                    let scoreId = level.stats.sortedByScore[i];
                    if (scoreId && game.world.balls[scoreId]) {
                        let ball = game.world.balls[scoreId].ball;

                        fill(ball.color[0], ball.color[1], ball.color[2]);
                        text('#' + (i + 1) +  ' - ' + ball.clears[Math.floor(level.id / 100) - 1][0] + ' - ' + ball.name, posX * SCALE, (posY + (i + 1) * 1.5 + 1) * SCALE);
                    }

                    let timeId = level.stats.sortedByTime[i];
                    if (timeId && game.world.balls[timeId]) {
                        let ball = game.world.balls[timeId].ball;

                        let time = ball.clears[Math.floor(level.id / 100) - 1][1];

                        let seconds = floor(time) % 60;
                        let minutes = floor(time / 60) % 60;
                        let hours = floor(time / 3600) % 60;

                        fill(ball.color[0], ball.color[1], ball.color[2]);
                        text('#' + (i + 1) +  ' - ' + hours + 'h ' + minutes + 'm ' + seconds + 's' + ' - ' + ball.name, (posX + 30) * SCALE, (posY + (i + 1) * 1.5 + 1) * SCALE);
                    }
                    
                }
                let myScoreIndex = level.stats.sortedByScore.indexOf(game.selfBall.id);
                if (myScoreIndex >= 10) {
                    fill(game.selfBall.color[0], game.selfBall.color[1], game.selfBall.color[2]);
                    text('#' + (myScoreIndex + 1) +  ' - ' + game.selfBall.clears[Math.floor(level.id / 100) - 1][0] + ' - ' + game.selfBall.name, posX * SCALE, (posY + 18) * SCALE);
                }
                let myTimeIndex = level.stats.sortedByTime.indexOf(game.selfBall.id);
                if (myTimeIndex >= 10) {
                    let time = game.selfBall.clears[Math.floor(level.id / 100) - 1][1];

                    let seconds = floor(time) % 60;
                    let minutes = floor(time / 60) % 60;
                    let hours = floor(time / 3600) % 60;

                    fill(game.selfBall.color[0], game.selfBall.color[1], game.selfBall.color[2]);
                    text('#' + (i + 1) +  ' - ' + hours + 'h ' + minutes + 'm ' + seconds + 's' + ' - ' + ball.name, (posX + 30) * SCALE, (posY + (i + 1) * 1.5 + 1) * SCALE);
                }

                
            }
        }
    }
}

function drawAim(input, color = [0, 0, 0], transparency = 1) {
    stroke(color[0], color[1], color[2], min(input.aimPower * 2000, 255 * transparency));
    noFill();

    let aimSize = min(input.aimPower * 60, 3);

    ellipse(input.aimX * SCALE, input.aimY * SCALE, aimSize * SCALE, aimSize * SCALE);
    
    line((input.aimX - input.aimVelX * 1.5) * SCALE, 
        (input.aimY - input.aimVelY * 1.5) * SCALE, 
        (input.aimX - input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE, 
        (input.aimY - input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE);
    
    stroke(color[0], color[1], color[2], min(input.aimPower * 2000, 100 * transparency));
    line((input.aimX + input.aimVelX * 1.5) * SCALE, 
        (input.aimY + input.aimVelY * 1.5) * SCALE, 
        (input.aimX + input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE, 
        (input.aimY + input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE);
    
    line((input.aimX + input.aimVelY + input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE, 
        (input.aimY - input.aimVelX + input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimX - input.aimVelY + input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE, 
        (input.aimY + input.aimVelX + input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE);
    
    noStroke();
    fill(color[0], color[1], color[2], min(input.aimPower * 3000, 255 * transparency));
    triangle(
        (input.aimX - input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimY - input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimX + input.aimVelY * 0.5 + input.aimVelX * 1.5 - input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimY - input.aimVelX * 0.5 + input.aimVelY * 1.5 - input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimX - input.aimVelY * 0.5 + input.aimVelX * 1.5 - input.aimVelX * max(40 * input.aimPower, 1.5)) * SCALE,
        (input.aimY + input.aimVelX * 0.5 + input.aimVelY * 1.5 - input.aimVelY * max(40 * input.aimPower, 1.5)) * SCALE,
    )
}

function draw() {
    if (!game.started) {
        background(0);

        noStroke();
        fill(255);

        textSize(32);
        textAlign(CENTER, TOP);
        text("Nathan Golfing 2:", width / 2, height / 2 - 150);

        textSize(64);
        text("Journey", width / 2, height / 2 - 140);

        if (!isLoggedIn()) {
            textSize(32);

            if (!getAdjective()) {
                text("describe your journey:", width / 2, height / 2 - 80);
                if (temp.adjectiveChoice == undefined) {
                    temp.adjectiveChoice = floor(random(0, constant.adjectives.length));
                }

                temp.adjective = constant.adjectives[temp.adjectiveChoice];
                text(temp.adjective, width / 2, height / 2 - 50);
                
                triangle(width / 2 + 10, height / 2 - 15, width / 2 + 20, height / 2 - 10, width / 2 + 10, height / 2 - 5);
                triangle(width / 2 - 20, height / 2 - 15, width / 2 - 10, height / 2 - 15, width / 2 - 15, height / 2 - 5);

                if (mouseIsPressed) {
                    if (isWithin(mouseX, mouseY, width / 2 + 10, height / 2 - 15, 10, 10)) {
                        temp.adjectiveChoice += 1;
                        if (temp.adjectiveChoice >= constant.adjectives.length) {
                        temp.adjectiveChoice = 0
                        }
                    } else if (isWithin(mouseX, mouseY, width / 2 - 20, height / 2 - 15, 10, 10)) {
                        localStorage.setItem("nathan_golfing_journey_adjective", temp.adjectiveChoice);
                    } 
                }
                return;
            }

            text("This is the " + getAdjective() + " journey of: ", width / 2, height / 2 - 80);
            if (temp.usernameTyped == undefined) {
                temp.usernameTyped = "";
            }

            if (temp.usernameFailReason) {
                fill(255, 0, 0);
                text(temp.usernameFailReason, width / 2, height / 2 + 40);
            }
            
            fill(255);
            textSize(64);
            text(temp.usernameTyped + "_", width / 2, height / 2);

        } else {

            if (!game.connected) {
                if (!temp.attemptedToConnect) {
                    connect();
                    temp.attemptedToConnect = true;
                }
                textSize(32);
                text("Loading...", width / 2, height / 2);

                if (temp.connectionError) {
                    fill(255, 0, 0);
                    text(temp.connectionError, width / 2, height / 2 + 40);
                }
            } else {
                textSize(32);
                text("This is the " + getAdjective() + " journey of", width / 2, height / 2 - 80);
                textSize(64);
                if (game.selfBall) {
                    fill(game.selfBall.color[0], game.selfBall.color[1], game.selfBall.color[2])
                } else {
                    fill(255);
                }
                text(game.username, width / 2, height / 2 - 70);

                fill(255);
                rect(width / 2 - 50, height / 2 + 10, 100, 20);
                textSize(32);
                fill(0);

                text("play", width / 2, height / 2 + 4);
                if (mouseIsPressed && isWithin(mouseX, mouseY, width / 2 - 50, height / 2 + 10, 100, 20)) {
                    game.started = true;
                }
            }
        }

        return;
    }

    update();

    background(250);
    push(); // World
    
    translate(OFFSET_X, OFFSET_Y);

    if (game.world != undefined && game.prevWorld != undefined) {

        let subtick = (Date.now() - game.worldUpdateTime) / 50;

        if (game.selfBall) {
            let prevPlayer = game.prevWorld.balls[game.selfBall.id];
            let player = game.world.balls[game.selfBall.id];
            if (player && prevPlayer) {
                let prevt = prevPlayer.ball.trans, newt = player.ball.trans;
                let x = newt > prevt ? newt : lerp(prevt, newt, subtick);
                if (game.selfBall.trans >= 0) {
                    translate(-game.levels[1].width * ((40 - x) / 40) * SCALE, 0)
                }
            }
            
        }
        
        if (game.levels) {

            let sum = 20 - game.levels[0].width; 
            for (let i = 0; i < 4; i++) {
                drawLevelFlag(game.levels[i], sum);
                sum += game.levels[i].width;
            }
            
        }

        temp.offlineBalls = [0, 0, 0, 0];

        push();
        translate((-game.levels[1].x + 20) * SCALE, 0);
        for (let id of game.world.sortedBalls) {
            let player = game.world.balls[id];
            if (!player.online) {
                if (game.selfBall) {
                    let ball = player.ball
                    if (ball.level >= game.selfBall.level && ball.level <= game.selfBall.level + 2) {

                        stroke(0);
                        fill(255);

                        let index = ball.level - game.selfBall.level;
                        if (temp.offlineBalls[index] <= 10) {
                            let level = game.levels[index];
                            let posX = level.x + level.holeX, posY = level.holeY - temp.offlineBalls[index] * 2 - 5;

                            let fmtBallName = ball.name + ' (' + ball.score + ')';

                            textSize(3 * SCALE);
                            textAlign(LEFT, CENTER);

                            rect((posX - 1) * SCALE, (posY - 3) * SCALE, 2 * SCALE + textWidth(fmtBallName), 2 * SCALE);

                            noStroke();
                            fill(ball.color[0], ball.color[1], ball.color[2]);
                            text(fmtBallName, posX * SCALE, (posY - 2.5) * SCALE);

                            temp.offlineBalls[index] += 1;
                        }
                    }
                }
            }
        }

        for (let id of game.world.sortedBalls) {
            let player = game.world.balls[id];
            let prevPlayer = game.prevWorld.balls[id];
            if (player && prevPlayer) {
                if (player.online) {

                    let prevBall = prevPlayer.ball, ball = player.ball;

                    let pos = {x: lerp(prevBall.x, ball.x, subtick), y: lerp(prevBall.y, ball.y, subtick)};
                    let ang = lerp(prevBall.rotation, ball.rotation, subtick);
                    stroke(0);
                    fill(ball.color[0], ball.color[1], ball.color[2]);
                    arc(pos.x * SCALE, pos.y * SCALE, 1 * SCALE, 1 * SCALE, ang, ang + PI);
                    fill(ball.color[0] * 0.8, ball.color[1] * 0.8, ball.color[2] * 0.8);
                    arc(pos.x * SCALE, pos.y * SCALE, 1 * SCALE, 1 * SCALE, ang + PI, ang + TWO_PI);

                    noStroke();
                    textSize(32);
                    textAlign(CENTER, BOTTOM)
                    text(ball.name, pos.x * SCALE, (pos.y - 2) * SCALE);

                    if (game.selfBall && ball.id == game.selfBall.id) {
                        stroke(0);
                        noFill();
                        triangle((pos.x) * SCALE, (pos.y - 1) * SCALE, (pos.x - 0.5) * SCALE, (pos.y - 1.5) * SCALE, (pos.x + 0.5) * SCALE, (pos.y - 1.5) * SCALE);
                    } else {
                        
                        if (ball.aiming) {

                            let aimX = ball.aimX;
                            let aimY = ball.aimY;

                            let aimVelX = lerp(prevBall.aimVelX, ball.aimVelX, subtick);
                            let aimVelY = lerp(prevBall.aimVelY, ball.aimVelY, subtick);

                            let aimPower = lerp(prevBall.aimPower, ball.aimPower, subtick);

                            let input = {aimX, aimY, aimVelX, aimVelY, aimPower};
                            drawAim(input, ball.color, 0.5);
                        }
                        
                    }
                }
            }
            
        }

    }
    pop();

    if (game.levels) {

        let sum = 20 - game.levels[0].width; 
        for (let i = 0; i < 4; i++) {
            drawLevel(game.levels[i], sum);
            sum += game.levels[i].width;
        }
        
        sum = 20 - game.levels[0].width; 
        for (let i = 0; i < 4; i++) {
            drawLevelStats(game.levels[i], sum);
            sum += game.levels[i].width;
        }
        
    }

    

    if (game.input.aiming) {
        if (game.selfBall) {
            drawAim(game.input, [0, 0, 0], game.selfBall.canStroke && game.selfBall.trans < 0 ? 1 : 0.4);
        }
        
    }

    pop();

    if (game.selfBall) {
        let selfIndex = game.world.sortedBalls.indexOf(game.selfBall.id);

        textAlign(CENTER, TOP); 
        fill(51);

        textSize(64);
        fill(game.selfBall.color[0], game.selfBall.color[1], game.selfBall.color[2]);
        text(game.selfBall.name, width / 2, -8);
        textSize(32);
        fill(51);
        text(game.selfBall.score + ' (avg ' + nf(game.selfBall.score / max(game.selfBall.level, 1), 0, 2) + ')', width / 2, 32);
        text(game.selfBall.level + ' / 10000 (#' + (selfIndex + 1) + ')', width / 2, 48);

        if (game.selfBall.trans > 0) {
            let seconds = floor(game.selfBall.time) % 60;
            let minutes = floor(game.selfBall.time / 60) % 60;
            let hours = floor(game.selfBall.time / 3600) % 60;

            text(hours + 'h ' + minutes + 'm ' + seconds + 's', width / 2, 64);
        }

        textSize(32);

        let top = [];
        let topClosest = [];
        let bottomClosest = [];

        for (let i = 0; i < 5; i++) {
            let b = game.world.sortedBalls[i];
            if (b && i < selfIndex) top.push(b);
        }
        for (let i = 1; i <= 5; i++) {
            let b = game.world.sortedBalls[selfIndex - i];
            if (b && !top.includes(b)) topClosest.push(b);
        }
        for (let i = 1; i <= 10; i++) {
            let b = game.world.sortedBalls[selfIndex + i];
            if (b) bottomClosest.push(b);
        }

        textSize(32);

        textAlign(RIGHT, CENTER);
        let k = 0;
        for (let b of top.concat(topClosest.reverse())) {
            let ball = game.world.balls[b].ball;

            fill(250);

            let nameFmt = '#' + (game.world.sortedBalls.indexOf(b) + 1) + ' ' + ball.name + ' (' + ball.level + '/' + ball.score + ')';

            let w = textWidth(nameFmt);

            stroke(0);
            let offsetY = top.includes(b) ? 0 : 10;
            beginShape();

            vertex(width - 15, offsetY + 5 + k * 20);
            vertex(width - 5, offsetY + 15 + k * 20);
            vertex(width - 15, offsetY + 25 + k * 20);
            vertex(width - 25 - w, offsetY + 25 + k * 20);
            vertex(width - 25 - w, offsetY + 5 + k * 20);
            
            endShape(CLOSE);

            noStroke();
            fill(ball.color[0], ball.color[1], ball.color[2]);
            text(nameFmt, width - 15, offsetY +  10 + k * 20);

            k++;
        }

        k = 0;
        textAlign(LEFT, CENTER);
        for (let b of bottomClosest) {
            let ball = game.world.balls[b].ball;

            fill(250);

            let nameFmt = '#' + (game.world.sortedBalls.indexOf(b) + 1) + ' ' + ball.name + ' (' + ball.level + '/' + ball.score + ')';

            let w = textWidth(nameFmt);

            stroke(0);
            beginShape();

            vertex(15, 5 + k * 20);
            vertex(5, 15 + k * 20);
            vertex(15, 25 + k * 20);
            vertex(25 + w, 25 + k * 20);
            vertex(25 + w, 5 + k * 20);
            
            endShape(CLOSE);

            noStroke();
            fill(ball.color[0], ball.color[1], ball.color[2]);
            text(nameFmt, 15, 10 + k * 20);

            k++;
        }
    }

    if (game.chat) {

        let k = 0;
        fill(0, 100);
        rect(0, height - 20 - game.chat.length * 15, 800, game.chat.length * 15);
        textAlign(LEFT, BOTTOM);
        textSize(32);
        for (let message of game.chat) {
            fill(message.color[0], message.color[1], message.color[2]);
            text(message.message, 5, height - 20 - k * 15);
            k++;
        }

        if (game.chatting) {
            fill(51);
            text(temp.typing + (Math.floor(millis() / 500) % 2 == 0 ? '_' : ''), 5, height - 5);
        }

    }

}