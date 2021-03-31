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
const score = document.querySelector("#score");
const toggler = document.querySelector(".settingsToggler");
const settings = document.getElementById("settings");
let lastRenderTime = 0;
let gameOver = false;

// Game SETTINGS
gameBoard.style.gridTemplateRows = "repeat(" + GRID_SIZE + ", 1fr)";
gameBoard.style.gridTemplateColumns = "repeat(" + GRID_SIZE + ", 1fr)";

// User SETTINGS
toggler.addEventListener("click", () => {
    settings.classList.toggle("open");
});

// Game RENDER_LOOP
function main(currentTime) {
    if (gameOver) {
        alert("You Lost. Your Score: " + (snakeBody.length - 1) + "");
        window.location = "/snakeGame/";
        return;
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
