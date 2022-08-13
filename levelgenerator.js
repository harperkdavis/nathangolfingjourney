const { Level } = require('./shared');
const { SimplexNoise } = require('simplex-noise');

let levels = {};

function generateLevel(noise, hole, previous) {

    let points = [];
    let holeX = 0;
    let holeY = 0;

    

    function generateHole(x, y) {
        points.push({x: x + 3.66, y});
        points.push({x: x + 3.66, y: y + 2});
        points.push({x: x + 5, y: y + 2.5});
        points.push({x: x + 6.33, y: y + 2});
        points.push({x: x + 6.33, y: y});
        points.push({x: x + 10, y});
        
        holeX = x + 5;
        holeY = y;
    }
    if (hole <= 1) {
        points.push({x: 0, y: 70});
        points.push({x: 160, y: 70});
        generateHole(160, 70);
    } else if (hole > 10000) {
        points.push({x: 0, y: previous.points[previous.points.length - 1].y});
        points.push({x: 100, y: 98});
        points.push({x: 100, y: 99.9});
        
        points.push({x: 10000, y: 99.9});
        points.push({x: 10000, y: 5});

        generateHole(10000, 5);
    } else {

        
        let posX = 0;
        let posY = previous.points[previous.points.length - 1].y;

        let lastWasFlat = false;
        let lastWasUp = false;
        let lastWasWater = false;

        let progress = hole / 10000;
        let weirdness = Math.max(Math.min(progress * 2 + noise.noise2D(0, hole * 0.004) * 0.2 * Math.min(progress * 200, 1), 1), 0);

        let flatThreshold = -0.6 + noise.noise2D(4000, hole * 0.01) * 0.1;
        let upThreshold = 0.4 + noise.noise2D(5000, hole * 0.01) * 0.1;
        let holeThreshold = Math.max(1 - weirdness * 0.25, upThreshold + 0.01);

        let widthModifier = noise.noise2D(1000, hole * 0.1) / 2 + 1;
        let heightModifier = noise.noise2D(2000, hole * 0.1) / 2 + 1 + progress * 0.5;
        
        for (let i = 0; i < 20; i++) {
            points.push({x: posX, y: posY});

            let rand = noise.noise3D(0, hole * 10, i * 100);
            let plusX = rand < flatThreshold && !lastWasFlat && i != 0 ? 0 : (noise.noise3D(100, hole * 10, i * 100) * 15 + 20) * widthModifier;

            

            if (posX + plusX > 170 || (noise.noise3D(400, hole * 10, i * 100) > posX / 200 && posX > 100)) {
                break;
            }

            let bias = (50 - posY) / 50;
            let plusY = rand > upThreshold && !lastWasUp && !lastWasWater ? 0 : noise.noise3D(200, hole * 10, i * 100) * 20 * heightModifier + bias * 5;

            if (i == 0 || lastWasWater || lastWasUp || rand < holeThreshold) {
                posX = Math.floor(posX + plusX);
                posY = Math.floor(Math.min(Math.max(posY + plusY, 10), 90));
            } else {

                points.push({x: posX, y: 99.9});

                posX = Math.floor(posX + plusX);

                points.push({x: posX, y: 99.9});

                posY = Math.floor(Math.min(Math.max(posY + plusY, 10), 90));
            }

            lastWasFlat = rand < flatThreshold;
            lastWasUp = rand > upThreshold;
            lastWasWater = rand >= holeThreshold;
            
            
        }

        generateHole(posX, posY);
        
        let finalPoints = [];

        for (let p of points) {
            let alreadyIn = false;
            for (let o of finalPoints) {
                if (p.x == o.x && p.y == o.y) {
                    alreadyIn = true;
                    break;
                }
            }
            if (!alreadyIn) {
                finalPoints.push(p);
            }
        }

        // collinear check
        // why fix the root problem when you can just patch it later?
        points = [];
        points.push(finalPoints[0]);
        for (let j = 2; j < finalPoints.length; j++) {
            let a = finalPoints[j - 2];
            let b = finalPoints[j - 1];
            let c = finalPoints[j];

            if (!(a.x == b.x && b.x == c.x) && !(a.y == b.y && b.y == c.y)) {
                points.push(b);
            }
        }
        points.push(finalPoints[finalPoints.length - 1]);

    }
    

    return new Level(hole, previous.x + previous.width, points, holeX, holeY);
}

function generate(seed) {
    const noise = new SimplexNoise(seed);
    let holes = [];
    let first = {x: -320, width: 170};
    for (let i = 0; i < 10004; i++) {
        holes.push(generateLevel(noise, i, i == 0 ? first : holes[i - 1]));
    }
    return holes;
}

function generateAndSave(seed) {
    const fs = require('fs');
    fs.writeFile("levels.json", JSON.stringify(generate(seed)), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

generateAndSave("aimbot.exe");


