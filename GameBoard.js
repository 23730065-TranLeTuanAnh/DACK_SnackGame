let unitSize = 20;
let foodObject;
let gameBoard = document.getElementById("gameBoard");
let ctx = gameBoard.getContext("2d");
let xSpeed = unitSize;
let ySpeed = 0;
let score = 0;
let running = true;
let checkButtonStart = false;
const btnStart = document.querySelector('.btn-start')

let snake = [{
    x: unitSize * 3,
    y: 0
}, {
    x: unitSize * 2,
    y: 0
}, {
    x: unitSize,
    y: 0
}, {
    x: 0,
    y: 0
}]



function startGame() {
    btnStart.textContent = 'restart';
    createFood();
    drawFood();
    drawSnake();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearGameBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200)
    } else {
        displayGameOver();
    }
}

function clearGameBoard() {
    ctx.fillStyle = '#455A64';
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height)
}

function createFood() {

    let x = Math.round(Math.random() * gameBoard.width / unitSize) * unitSize;
    let y = Math.round(Math.random() * gameBoard.height / unitSize) * unitSize;
    foodObject = {
        x,
        y
    };

}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodObject.x, foodObject.y, unitSize, unitSize);
}

function drawSnake() {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.fillRect(snake[0].x, snake[0].y, unitSize, unitSize);
    ctx.strokeRect(snake[0].x, snake[0].y, unitSize, unitSize);
    ctx.fillStyle = 'green';


    for (let i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
        ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
    }


}

function moveSnake() {
    let head = {
        x: snake[0].x + xSpeed,
        y: snake[0].y + ySpeed
    }
    snake.unshift(head);
    if (snake[0].x === foodObject.x && snake[0].y === foodObject.y) {
        score++;
        document.getElementById("scoreText").innerText = score;
        createFood();
    } else {
        snake.pop();
    }

}

window.addEventListener("keydown", changeDirect)

function changeDirect(event) {

    let key = event.key;
    let goingUp = ySpeed === -unitSize;
    let goingDown = ySpeed === unitSize;
    let goingRight = xSpeed === unitSize;
    let goingLeft = xSpeed === -unitSize;
    if (key === "ArrowUp" && !goingDown) {
        xSpeed = 0;
        ySpeed = -unitSize;
    }
    if (key === "ArrowDown" && !goingUp) {
        xSpeed = 0;
        ySpeed = unitSize;
    }
    if (key === "ArrowRight" && !goingLeft) {
        xSpeed = unitSize;
        ySpeed = 0
    }
    if (key === "ArrowLeft" && !goingRight) {
        xSpeed = -unitSize;
        ySpeed = 0
    }


}

function checkGameOver() {
    let touchUp = snake[0].y < 0;
    let touchDown = snake[0].y > gameBoard.height - unitSize;
    let touchLeft = snake[0].x < 0;
    let touchRight = snake[0].x > gameBoard.width - unitSize;
    if (touchUp || touchDown || touchLeft || touchRight) {
        running = false
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            running = false;
            break;
        }
    }
}

function restartGame() {
    btnStart.textContent = 'start';
    location.reload();

}

function displayGame() {
    checkButtonStart = !checkButtonStart;
    checkButtonStart ? startGame() : restartGame();
}

function displayGameOver() {

    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameBoard.width / 2, gameBoard.height / 2);
}