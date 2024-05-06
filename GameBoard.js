let unitSize = 20;
let foodObject;
let gameBoard = document.getElementById("gameBoard");
let ctx = gameBoard.getContext("2d");

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

startGame();


function startGame() {
    createFood();
    drawFood();
    drawSnake();
}

function createFood() {
    console.log("123");
    let x = Math.round(Math.random() * gameBoard.width / unitSize) * unitSize;
    let y = Math.round(Math.random() * gameBoard.height / unitSize) * unitSize;
    foodObject = {
        x,
        y
    };

}

function drawFood() {
    console.log("456")
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