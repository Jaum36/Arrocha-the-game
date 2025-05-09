// src/core/game.js

let gameState = "menu"; // Can be 'menu', 'game', or 'options'
let player;
let lasers = [];
let coins = [];
let powerUps = [];
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  // Initialize other game entities as needed
}

function draw() {
  background(245, 239, 235);
  
  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "game") {
    updateGame();
    renderGame();
  } else if (gameState === "options") {
    drawOptions();
  }
}

function updateGame() {
  player.update();
  // Update lasers, coins, power-ups, etc.
  for (let laser of lasers) {
    laser.update();
  }
  for (let coin of coins) {
    coin.update();
  }
  for (let powerUp of powerUps) {
    powerUp.update();
  }
}

function renderGame() {
  player.draw();
  // Draw lasers, coins, power-ups, etc.
  for (let laser of lasers) {
    laser.draw();
  }
  for (let coin of coins) {
    coin.draw();
  }
  for (let powerUp of powerUps) {
    powerUp.draw();
  }
}

// Function to handle game state transitions
function changeGameState(newState) {
  gameState = newState;
  if (newState === "game") {
    setup(); // Reinitialize game entities
  }
}

// Add other game logic functions as needed

// Export functions if necessary for other modules
export { setup, draw, changeGameState };