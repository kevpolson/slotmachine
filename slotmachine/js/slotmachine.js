/// <reference path="createjs-2013.12.12.min.js" />

var stage;
var spinResult = ["seven", "seven", "seven"];

//reel demensions
var REEL = { WIDTH: 86, HEIGHT: 107 };

//reel locations on slot machine
var REEL1 = { X: 56, Y: 132 };
var REEL2 = { X: 161, Y: 132 };
var REEL3 = { X: 266, Y: 132 };

//text locations
var MONEY = { X: 40, Y: 250 };
var BET = { X: 175, Y: 250 };
var PAID = { X: 250, Y: 250 };
var HEADLINE = { X: 60, Y: 280 };

//text items
var money;
var bet;
var paid;

var MAX_JACKPOT_STRING_LENGTH = 14;
var MAX_MONEY_STRING_LENGTH = 8;
var MAX_PAID_STRING_LENGTH = 8;
var MAX_BET_STRING_LENGTH = 4;

//image locations on spritesheet
var SEVEN = { X: 0, Y: 0 };
var BLANK = { X: 95, Y: 0 };
var GRAPE = { X: 190, Y: 0 };
var LEMON = { X: 0, Y: 115 };
var BANANA = { X: 95, Y: 115 };
var CHERRY = { X: 0, Y: 230 };
var BAR = { X: 95, Y: 230 };
var ORANGE = { X: 190, Y: 230 };

//reel variables
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
                [BLANK.X, BLANK.Y, REEL.WIDTH, REEL.HEIGHT, 0, 0, 0]
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
var reelSheet;
var reel1Result;
var reel2Result;
var reel3Result;

var spinButton;
var noSpinButton;

//button locations
var SPIN = { X: 320, Y: 340 };
var RESET = { X: 34, Y: 343 }; 
var PAY_TABLE = { X: 92, Y: 343 };
var BET_MINUS = { X: 150, Y: 343 };
var BET_ADD = { X: 208, Y: 343 };

//initialize the game framework
function init() {
    stage = new createjs.Stage(document.getElementById('slotmachine'));
    createjs.Ticker.addEventListener('tick', handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

//update method
function handleTick(e) {
    updateReels();

    updateMoney();
    updateBet();
    updatePaid();
    updateJackpot();

    if (playerBet > playerMoney) {
        disableSpinButton();
    } else {
        enableSpinButton();
    }

    stage.update();
}

//initialize all the components of the slotmachine
function start() {
    initSlotmachine();
    initReels();
    initMoney();

    initSpinButton();
    initNoSpinButton();
    initResetButton();
    initPayButton();
    initBetMinusButton();
    initBetAddButton();
}

//setup the slotmachine on screen
function initSlotmachine() {
    var slotImage = 'img/slotmachine.png';
    var slotmachine = new createjs.Bitmap(slotImage);
    stage.addChild(slotmachine);
}

//setup the initial reels on screen
function initReels() {
    reelSheet = new createjs.SpriteSheet(reelData);

    reel1Result = new createjs.Sprite(reelSheet, spinResult[0]);
    reel2Result = new createjs.Sprite(reelSheet, spinResult[1]);
    reel3Result = new createjs.Sprite(reelSheet, spinResult[2]);

    reel1Result.x = REEL1.X;
    reel1Result.y = REEL1.Y;
    reel2Result.x = REEL2.X;
    reel2Result.y = REEL2.Y;
    reel3Result.x = REEL3.X;
    reel3Result.y = REEL3.Y;
    stage.addChild(reel1Result, reel2Result, reel3Result);
}
var jackpotTotal;
var jackpotTitle;
var JACKPOT_TITLE = { X: 178, Y: 34 };
var JACKPOT_TOTAL = { X: 19, Y: 45 };
//initialize the money on the machine
function initMoney() {
    jackpotTitle = new createjs.Text('JACKPOT!!', 'bold 12px Courier New', '#ffffff');
    jackpotTitle.x = JACKPOT_TITLE.X;
    jackpotTitle.y = JACKPOT_TITLE.Y;

    jackpotTotal = new createjs.Text('00000000000000', 'bold 44px Courier New', '#32CD32');
    jackpotTotal.x = JACKPOT_TOTAL.X;
    jackpotTotal.y = JACKPOT_TOTAL.Y;

    money = new createjs.Text('00000000', 'bold 25px Courier New', '#ff7700');
    money.x = MONEY.X;
    money.y = MONEY.Y;

    paid = new createjs.Text('00000000', 'bold 25px Courier New', '#ff7700');
    paid.x = PAID.X;
    paid.y = PAID.Y;

    headline = new createjs.Text('Credits    Bet   Winnings', 'bold 20px Courier New', '#ffffff');
    headline.x = HEADLINE.X;
    headline.y = HEADLINE.Y;

    bet = new createjs.Text('0000', 'bold 25px Courier New', '#ff7700');
    bet.x = BET.X;
    bet.y = BET.Y;

    stage.addChild(money, bet, paid, headline, jackpotTitle, jackpotTotal);
}

//initialize the spin button
function initSpinButton() {
    var spinImage = 'img/spin.png';
    spinButton = new createjs.Bitmap(spinImage);
    spinButton.x = SPIN.X;
    spinButton.y = SPIN.Y;
    spinButton.addEventListener("click", handleClickSpin);
    function handleClickSpin(event) {
        spinResult = spinReels();
        console.log(spinResult[0] + ' ' + spinResult[1] + ' ' + spinResult[2]);
        determineWinnings();
    }
}

//initialize the disabled spin button
function initNoSpinButton() {
    var noSpinImage = 'img/noSpin.png';
    noSpinButton = new createjs.Bitmap(noSpinImage);
    noSpinButton.x = SPIN.X;
    noSpinButton.y = SPIN.Y;
}

//initialize the reset game button
function initResetButton() {
    var resetImage = 'img/reset.png';
    var resetButton = new createjs.Bitmap(resetImage);
    resetButton.x = RESET.X;
    resetButton.y = RESET.Y;
    resetButton.addEventListener("click", handleClickReset);
    function handleClickReset(event) {
        resetAll();
    }

    stage.addChild(resetButton);
}

//initialize the pay out button
function initPayButton() {
    var payImage = 'img/payTable.png';
    var payButton = new createjs.Bitmap(payImage);
    payButton.x = PAY_TABLE.X;
    payButton.y = PAY_TABLE.Y;
    payButton.addEventListener("click", handleClickPay);
    function handleClickPay(event) {
        var leave = confirm("Are you sure you wish to cash out and leave this HOT slot machine?");
        if (leave) {
            window.location.href = "vegas.html";
        }
    }

    stage.addChild(payButton);
}

//initialize the bet decrease button
function initBetMinusButton() {
    var betMinusImage = 'img/betMinus.png';
    var betMinusButton = new createjs.Bitmap(betMinusImage);
    betMinusButton.x = BET_MINUS.X;
    betMinusButton.y = BET_MINUS.Y;
    betMinusButton.addEventListener("click", handleClickBetMinus);
    function handleClickBetMinus(event) {
        if (playerBet > MIN_BET) {
            playerBet -= MIN_BET;
        }
    }

    stage.addChild(betMinusButton);
}

//initialize the bet increase button
function initBetAddButton() {
    var betAddImage = 'img/betAdd.png';
    var betAddButton = new createjs.Bitmap(betAddImage);
    betAddButton.x = BET_ADD.X;
    betAddButton.y = BET_ADD.Y;
    betAddButton.addEventListener("click", handleClickBetAdd);
    function handleClickBetAdd(event) {
        if (playerBet < MAX_BET) {
            playerBet += MIN_BET;
        }
    }

    stage.addChild(betAddButton);
}

//this function changes the reels so that the images match the text
function updateReels() {
    reel1Result.gotoAndPlay(spinResult[0]);
    reel2Result.gotoAndPlay(spinResult[1]);
    reel3Result.gotoAndPlay(spinResult[2]);
}

//this function updates the credits text
function updateMoney() {
    var moneyStr = '';
    for (var i = 0; i < MAX_MONEY_STRING_LENGTH - playerMoney.toString().length; i++) {
        moneyStr += '0';
    }
    money.text = moneyStr + playerMoney.toString();
}

//this function updates the jackpot text
function updateJackpot() {
    var jackpotStr = '';
    for (var i = 0; i < MAX_JACKPOT_STRING_LENGTH - jackpot.toString().length; i++) {
        jackpotStr += '0';
    }
    jackpotTotal.text = jackpotStr + jackpot.toString();
}

//this function updates the bet text
function updateBet() {
    var betStr = '';
    for (var i = 0; i < MAX_BET_STRING_LENGTH - playerBet.toString().length; i++) {
        betStr += '0';
    }
    bet.text = betStr + playerBet.toString();
}

//this function updates the winnings text
function updatePaid() {
    var paidStr = '';
    for (var i = 0; i < MAX_PAID_STRING_LENGTH - winnings.toString().length; i++) {
        paidStr += '0';
    }
    paid.text = paidStr + winnings.toString();
}

//this function removes the spin button with the click listener and add the disabled spin button 
function disableSpinButton() {
    //spinButton.removeAllEventListeners();
    stage.removeChild(spinButton);
    stage.addChild(noSpinButton);
}

//this function removes the disabled spin button and add the spin button with the click listener
function enableSpinButton() {
    stage.removeChild(noSpinButton);
    stage.addChild(spinButton);
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

var MAX_BET = 1000;
var MIN_BET = 10;
var BET_INCREMENT = 10;

var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var playerBet = MIN_BET;

//reset the game to defaults
function resetAll() {
    spinResult = ["seven", "seven", "seven"];
    playerMoney = 1000;
    winnings = 0;
    //jackpot = 5000;
    playerBet = MIN_BET;
}


/* When this function is called it determines the betLine results. */
//e.g. Bar - Orange - Banana
function spinReels() {
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
    lemons = 0;
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

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    winnings = 0;
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (lemons == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (lemons == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        playerMoney += winnings;
        resetFruitTally();
        checkJackPot();
    }
    else {
        playerMoney -= playerBet;
        jackpot += playerBet;
        resetFruitTally();
    }

}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 5000;
    }
}