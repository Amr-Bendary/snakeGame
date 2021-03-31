import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    snakeIntersection,
    snakeBody,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { GRID_SIZE } from "./grid.js";

const gameBoard = document.getElementById("game-board");
const score = document.querySelector(".score");
let lastRenderTime = 0;
let gameOver = false;

// Game SETTINGS
gameBoard.style.gridTemplateRows = "repeat(" + GRID_SIZE + ", 1fr)";
gameBoard.style.gridTemplateColumns = "repeat(" + GRID_SIZE + ", 1fr)";

// Game RENDER_LOOP
function main(currentTime) {
    if (gameOver) {
        alert("You Lost. Your score: " + (snakeBody.length - 1) + "");
        window.location = "/snakeGame/";
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    score.textContent = "Score: " + (snakeBody.length - 1);
    draw();
    checkDeath();
}
window.requestAnimationFrame(main);

// Game LOGIC
function update() {
    updateSnake();
    updateFood();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = snakeIntersection();
}
