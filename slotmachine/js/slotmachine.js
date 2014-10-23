/// <reference path="createjs-2013.12.12.min.js" />

var stage;

var REEL = { width: 86, height: 107 };

var REEL1 = { X: 56, Y: 132 };
var REEL2 = { X: 161, Y: 132 };
var REEL3 = { X: 266, Y: 132 };

var SEVEN = { X: 0, Y: 0 };
var GRAPE = { X: 190, Y: 0 };

var LEMON = { X: 0, Y: 115 };
var BANANAS = { X: 95, Y: 115 };

var CHERRIES = { X: 0, Y: 230 };
var BARS = { X: 95, Y: 230 };
var ORANGE = { X: 190, Y: 230 };

var reelData = {
    images: ['img/reel_icons.jpg'],
    frames: [
                [SEVEN.X, SEVEN.Y, REEL.width, REEL.height, 0, 0, 0],
                [GRAPE.X, GRAPE.Y, REEL.width, REEL.height, 0, 0, 0],
                [LEMON.X, LEMON.Y, REEL.width, REEL.height, 0, 0, 0],
                [BANANAS.X, BANANAS.Y, REEL.width, REEL.height, 0, 0, 0],
                [CHERRIES.X, CHERRIES.Y, REEL.width, REEL.height, 0, 0, 0],
                [ORANGE.X, ORANGE.Y, REEL.width, REEL.height, 0, 0, 0],
                [BARS.X, BARS.Y, REEL.width, REEL.height, 0, 0, 0]
    ],
    animations: {
        seven: 0,
        grape: 1,
        lemon: 2,
        bananas: 3,
        cherries: 4,
        orange: 5,
        bars: 6
    }
};

function init() {
    stage = new createjs.Stage(document.getElementById('slotmachine'));
    createjs.Ticker.addEventListener('tick', handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

function handleTick(e) {
    //update method
    draw();
    stage.update();
}

function start() {

}

function drawSlotmachine() {
    var reelSheet = new createjs.SpriteSheet(reelData);
    var reel1Result = new createjs.Sprite(reelSheet, 0);
    var reel2Result = new createjs.Sprite(reelSheet, 3);
    var reel3Result = new createjs.Sprite(reelSheet, "bars");

    var image = 'img/slotmachine.png';
    var slotmachine = new createjs.Bitmap(image);
    stage.addChild(slotmachine);

    reel1Result.x = REEL1.X;
    reel1Result.y = REEL1.Y;
    reel2Result.x = REEL2.X;
    reel2Result.y = REEL2.Y;
    reel3Result.x = REEL3.X;
    reel3Result.y = REEL3.Y;
    stage.addChild(reel1Result, reel2Result, reel3Result);
}

function draw() {
    drawSlotmachine();
}

