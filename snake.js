// 1. Variable Declaration;

let cvs = document.getElementById('canvas').getContext("2d")
let sPosX = 80;
let sPosY = 80;
let nPosX = 0;
let nPosY = 0;
let fPosX = 140;
let fPosY = 140;
let snakeTail = [];
let snakeSize = 1;
let score = 0;
let game;
let gameStatus = "Ready"


// 2. Onload Function;

window.onload = () => {
    document.addEventListener("keydown", inputControl);
   game = setInterval(mianGame, 100);
}

// 3. Main Game Function;

const mianGame = () => {
    document.getElementById("score").innerHTML = score;
    document.getElementById("game-status").innerHTML = gameStatus;
    // Move Snake
    sPosX += nPosX;
    sPosY += nPosY;

    // Control Snake Movement
    if (sPosX > 400) {
        sPosX = 0;
    }
    if (sPosY > 400) {
        sPosY = 0;
    }
    if (sPosX < 0) {
        sPosX = 400;
    }
    if (sPosY < 0) {
        sPosY = 400;
    }

    // Game Area

    //Background Color
    cvs.fillStyle = "black";
    cvs.fillRect(0, 0, 400, 400);


    // grid line
    for (let cl = 0; cl < 400; cl += 20) {
        cvs.moveTo(cl, 0);
        cvs.lineTo(cl, 400);
    }
    for (let rl = 0; rl < 400; rl += 20) {
        cvs.moveTo(0, rl);
        cvs.lineTo(400, rl);
    }
    cvs.strokeStyle = "grey"
    cvs.stroke();

    // Snake 
    cvs.fillStyle = "yellow";
    // cvs.fillRect(sPosX, sPosY, 20, 20);
    for (let i = 0; i < snakeTail.length; i++) {
        cvs.fillRect(
            snakeTail[i].x, snakeTail[i].y, 20, 20
        )
        // snake touched sanketail
        if(sPosX == snakeTail[i].x && sPosY == snakeTail[i].y && snakeSize > 1){
            clearInterval(game)
            gameStatus = "Game Over";
        document.getElementById("game-status").innerHTML = gameStatus;
        }
    }

    //Fruit
    cvs.fillStyle = "red";
    cvs.fillRect(fPosX, fPosY, 20, 20)

    //if snake eat fruit
    if (sPosX == fPosX && sPosY == fPosY) {
        snakeSize++;
        score += 10;
        fPosX = Math.floor(Math.random() * 20) * 20;
        fPosY = Math.floor(Math.random() * 20) * 20;
    }

    snakeTail.push({ x: sPosX, y: sPosY });
    while (snakeTail.length > snakeSize) {
        snakeTail.shift();
    }
}

// 4. Input Controll Function;

const inputControl = (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 38:
            nPosY -= 20;
            nPosX = 0;
            break;
        case 40:
            nPosY += 20;
            nPosX = 0;
            break;
        case 39:
            nPosX += 20;
            nPosY = 0;
            break;
        case 37:
            nPosX -= 20;
            nPosY = 0;
            break;
    }
    if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 38 ){
        gameStatus = "Game Started";
        document.getElementById("game-status").innerHTML = gameStatus;
    }
}