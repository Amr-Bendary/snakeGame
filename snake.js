import { GRID_SIZE } from "./grid.js";
import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;
export const snakeBody = [{ x: 11, y: 11 }];
let newPieces = 0;

export function update() {
    addPieces();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    if (snakeBody[0].x <= 0) {
        snakeBody[0].x = GRID_SIZE;
    } else if (snakeBody[0].x >= GRID_SIZE + 1) snakeBody[0].x = 1;
    snakeBody[0].y += inputDirection.y;
    if (snakeBody[0].y <= 0) {
        snakeBody[0].y = GRID_SIZE;
    } else if (snakeBody[0].y >= GRID_SIZE + 1) snakeBody[0].y = 1;
}

export function draw(gameBoard) {
    snakeBody.forEach((piece) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = piece.y;
        snakeElement.style.gridColumnStart = piece.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newPieces += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((piece, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(piece, position);
    });
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addPieces() {
    for (let i = 0; i < newPieces; i++) {
        snakeBody.push({ ...(snakeBody.length - 1) });
    }
    newPieces = 0;
}
