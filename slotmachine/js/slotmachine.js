/// <reference path="createjs-2013.12.12.min.js" />

var stage;
var spinResult = ["seven", "seven", "seven"];

var REEL = { WIDTH: 86, HEIGHT: 107 };

var REEL1 = { X: 56, Y: 132 };
var REEL2 = { X: 161, Y: 132 };
var REEL3 = { X: 266, Y: 132 };

var SEVEN = { X: 0, Y: 0 };
var BLANK = { X: 95, Y: 0 };
var GRAPE = { X: 190, Y: 0 };

var LEMON = { X: 0, Y: 115 };
var BANANA = { X: 95, Y: 115 };

var CHERRY = { X: 0, Y: 230 };
var BAR = { X: 95, Y: 230 };
var ORANGE = { X: 190, Y: 230 };

var reelData = {
    images: ['img/reel_icons.jpg'],
    frames: [
                [SEVEN.X, SEVEN.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [GRAPE.X, GRAPE.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [LEMON.X, LEMON.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [BANANA.X, BANANA.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [CHERRY.X, CHERRY.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [ORANGE.X, ORANGE.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [BAR.X, BAR.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0],
                [BLANK.X, BLANK.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0] //change to blank
    ],
    animations: {
        seven: 0,
        grape: 1,
        lemon: 2,
        banana: 3,
        cherry: 4,
        orange: 5,
        bar: 6,
        blank: 7
    }
};

var SPIN = { X: 320, Y: 340 };
var RESET = { X: 34, Y: 343 }; 
var PAY_TABLE = { X: 92, Y: 343 };
var BET_MINUS = { X: 150, Y: 343 };
var BET_ADD = { X: 208, Y: 343 };

function init() {
    stage = new createjs.Stage(document.getElementById('slotmachine'));
    createjs.Ticker.addEventListener('tick', handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

function handleTick(e) {
    //update method
    updateReels();
    stage.update();
}

function start() {
    updateSlotmachine();
    updateSpinButton();
    updateResetButton();
    updatePayButton();
    updateBetMinusButton();
    updateBetAddButton();
}

function updateSlotmachine() {
    var slotImage = 'img/slotmachine.png';
    var slotmachine = new createjs.Bitmap(slotImage);
    stage.addChild(slotmachine);
}

function updateReels() {
    var reelSheet = new createjs.SpriteSheet(reelData);
    var reel1Result = new createjs.Sprite(reelSheet, spinResult[0]);
    var reel2Result = new createjs.Sprite(reelSheet, spinResult[1]);
    var reel3Result = new createjs.Sprite(reelSheet, spinResult[2]);

    reel1Result.x = REEL1.X;
    reel1Result.y = REEL1.Y;
    reel2Result.x = REEL2.X;
    reel2Result.y = REEL2.Y;
    reel3Result.x = REEL3.X;
    reel3Result.y = REEL3.Y;
    stage.addChild(reel1Result, reel2Result, reel3Result);
}

function updateSpinButton() {
    var spinImage = 'img/spin.png';
    var spinButton = new createjs.Bitmap(spinImage);
    spinButton.x = SPIN.X;
    spinButton.y = SPIN.Y;
    spinButton.addEventListener("click", handleClickSpin);
    function handleClickSpin(event) {
        spinResult = Reels();
        console.log(spinResult[0] + ' ' + spinResult[1] + ' ' + spinResult[2]);
    }

    stage.addChild(spinButton);
}

function updateResetButton() {
    var resetImage = 'img/reset.png';
    var resetButton = new createjs.Bitmap(resetImage);
    resetButton.x = RESET.X;
    resetButton.y = RESET.Y;
    resetButton.addEventListener("click", handleClickReset);
    function handleClickReset(event) {
        console.log('reset');
    }

    stage.addChild(resetButton);
}

function updatePayButton() {
    var payImage = 'img/payTable.png';
    var payButton = new createjs.Bitmap(payImage);
    payButton.x = PAY_TABLE.X;
    payButton.y = PAY_TABLE.Y;
    payButton.addEventListener("click", handleClickPay);
    function handleClickPay(event) {
        console.log('pay');
    }

    stage.addChild(payButton);
}

function updateBetMinusButton() {
    var betMinusImage = 'img/betMinus.png';
    var betMinusButton = new createjs.Bitmap(betMinusImage);
    betMinusButton.x = BET_MINUS.X;
    betMinusButton.y = BET_MINUS.Y;
    betMinusButton.addEventListener("click", handleClickBetMinus);
    function handleClickBetMinus(event) {
        console.log('betMinus');
    }

    stage.addChild(betMinusButton);
}

function updateBetAddButton() {
    var betAddImage = 'img/betAdd.png';
    var betAddButton = new createjs.Bitmap(betAddImage);
    betAddButton.x = BET_ADD.X;
    betAddButton.y = BET_ADD.Y;
    betAddButton.addEventListener("click", handleClickBetAdd);
    function handleClickBetAdd(event) {
        console.log('betAdd');
    }

    stage.addChild(betAddButton);
}



//functions for slotmachine
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var lemons = 0;
var sevens = 0;
var blanks = 0;
/* When this function is called it determines the betLine results. */
//e.g. Bar - Orange - Banana


function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grape";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "lemon";
                lemons++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}
