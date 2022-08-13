const mongoose = require('mongoose');
const { Ball } = require('./shared');
const crypto = require("crypto");
const hash = require('string-hash');

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://admin:SmpPZXbuDHdMYnOE@hked.mwinf.mongodb.net/nathangolfingjourney?retryWrites=true&w=majority");
    } catch (e) {
        console.error(e);
        setTimeout(connect, 5000);
    }
}

async function newBall(name) {

    if (name == 'admin') {
        return {
            success: false,
            error: 'you trying to pull something here?'
        }
    } else if (name == 'harperkdavis') {
        return {
            success: false,
            error: 'i dont think that is you'
        }
    } else if (name == 'nathan') {
        return {
            success: false,
            error: 'that is you, but not your name'
        }
    } else if (name == 'nathan golfing') {
        return {
            success: false,
            error: 'you are not the game'
        }
    } else if (name == 'cumdickshitballs') {
        return {
            success: false,
            error: 'you are really trying here'
        }
    } else if (name == 'qwertyuiop') {
        return {
            success: false,
            error: 'please be more creative'
        }
    } else if (name == 'cum' || name == 'penis') {
        return {
            success: false,
            error: 'wow very mature'
        }
    } else if (name == 'fuck you') {
        return {
            success: false,
            error: "i'm offended"
        }
    }

    let ball = await BallModel.findOne({name}).exec();

    if (ball) {
        return {
            success: false,
            error: 'user already exists'
        }
    }
    
    let username = name.trim() || crypto.randomBytes(16).toString("hex");
    let h = crypto.createHash('md5').update(username).digest('hex');

    let r = Math.ceil(Math.sqrt(Math.floor(parseInt(h.substring(h.length - 2), 16)) / 256) * 256);
    let g = Math.ceil(Math.sqrt(Math.floor(parseInt(h.substring(h.length - 6, h.length - 4), 16)) / 256) * 256);
    let b = Math.ceil(Math.sqrt(Math.floor(parseInt(h.substring(h.length - 12, h.length - 10), 16)) / 256) * 256);

    const id = crypto.randomBytes(256).toString("hex");
    const newBall = new BallModel({ _id: id, name: username, color: [r, g, b]});
    try {
        await newBall.save();
        await updateDatabase();
    } catch (e) {
        return {
            success: false,
            error: 'unknown database error!'
        }
    }
    
    return {
        success: true,
        newBall
    };
}

async function getBall(id) {
    let ball = await BallModel.findOne({_id: id}).exec();
    
    if (!ball) {
        return {
            exists: false,
        }
    }

    return {
        exists: true,
        ball
    }
}

async function updateDatabase() {
    ballCache = await BallModel.find({}).exec();
}

let ballCache = [];
async function allBalls() {
    return ballCache;
}

const ballSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    color: {type: Array, default: [0, 0, 0]},
    clears: {type: Array, default: new Array(100).fill([Infinity, Infinity])},
    level: {type: Number, default: 0},
    score: {type: Number, default: 0},
    time: {type: Number, default: 0},
});

const BallModel = mongoose.model('ball', ballSchema);

module.exports = {
    connect,
    newBall,
    getBall,
    allBalls,
    updateDatabase,
}