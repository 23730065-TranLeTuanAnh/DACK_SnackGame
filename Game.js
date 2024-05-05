let gameBoard = document.getElementById("gameBoard");
let ctx = gameBoard.getContext("2d");
let unitSize = 15;
let foodObject;

startGame();

function startGame() {
    createFood();
    drawFood();
}

function createFood() {
    console.log("123")
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