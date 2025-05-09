let squareX;
let squareY;
const squareSize = 50;
const speed = 5;
let gameState = "menu"; // Can be 'menu' or 'game'
let buttonWidth = 200;
let buttonHeight = 50;

let controlScheme = "WASD";

let musicVolume = 0.5;
let sfxVolume = 0.5;
let sliderX, sliderX2;
let sliderY, sliderY2;
let sliderWidth = 200;
let sliderHeight = 20;
let isDragging = false;
let isDraggingSFX = false;

let playerHealth = 100;
let isDead = false;

const VERTICAL_LASER_CHANCE = 0.5; // 30% chance for vertical lasers

let isAudioStarted = false; // Add this with your other variables

let customFont; // Variável para armazenar a fonte
let bgMusic;

let coins = [];
let coinImage;
let score = 0;
let speedMultiplier = 1;
let COIN_SPAWN_RATE = 180; // Frames between coin spawns
let framesSinceLastCoin = 0;
const COINS_FOR_SPEEDUP = 5;
const SPEED_INCREASE = 0.2; // 20% increase per level
const COIN_SPEED = 5;

let playerHeight = squareSize * 1.5;

let hoverLerp = 0;
const hoverSpeed = 0.15;
let buttonHoverStates = {};
let popupHoverStates = {};
const popupHoverSpeed = 0.15;

const WALL_LEFT = 0;
const WALL_RIGHT = window.innerWidth;

let isCrouching = false;

let eskineParado;
let eskineParadoEsquerda;
let eskinePulando;
let eskinePulandoEsquerda;
let eskineMorrendo;
let eskineAgachado;

let songs = [
  {
    name: "Resenha do Arrocha 1.0",
    file: "assets/sounds/music/Iframe RESENHA DO ARROCHA 1.0 - J. ESKINE - CALMA VIDA TÁ DE BOA [Q9VAdq223VU].mp3",
  },
  {
    name: "Resenha do Arrocha 2.0",
    file: "assets/sounds/music/Resenha2.mp3",
  },
  {
    name: "Resenha do Arrocha 3.0",
    file: "assets/sounds/music/Iframe J. ESKINE - RESENHA DO ARROCHA 3.0 _ O QUE BATE É MALUQUICE [8WVQBd003VU].mp3",
  },
  {
    name: "Resenha de Ex Love",
    file: "assets/sounds/music/Iframe J. ESKINE - RESENHA DE EX-LOVE _ O QUE BATE É MALUQUICE [tvQ_TPtS9Mc].mp3",
  },
  {
    name: "Mãe Solteira",
    file: "assets/sounds/music/Iframe MÃE SOLTEIRA - J.Eskine, MC Davi, MC G15, DG e Batidão Stronda (GR6 Explode) [WpzuDyiwfSg].mp3",
  },
];
let currentSongIndex = 0;

let eskineCorrendoFrames = [];
let eskineCorrendoEsquerdaFrames = [];
let currentRunFrame = 0;
let frameCounter = 0;
const FRAME_DELAY = 5; // Adjust this to control animation speed

let isJumping = false; // Variável para controlar o estado do pulo
let facingRight = true;

let lasers = [];
const LASER_SPEED = 7;
const LASER_DAMAGE = 10;
const LASER_SPAWN_RATE = 120; // Frames between laser spawns
let framesSinceLastLaser = 0;

let jumpSound;
let hitSound;
let coinSound;

let gamepadConnected = false;
let gamepadIndex = null;
const GAMEPAD_DEADZONE = 0.15; // Zona morta para evitar movimento acidental

let colorMode = "Normal";
let selectedColor = 0;
const colorModes = ["Normal", "Protanopia", "Deuteranopia", "Tritanopia"];
const colorSchemes = {
  Normal: {
    primary: [85, 104, 175], // Blue
    accent: [205, 214, 41], // Green
  },
  Protanopia: {
    primary: [0, 70, 140], // Dark blue (appears dark to protanopes)
    accent: [255, 220, 0], // Yellow (visible to protanopes)
  },
  Deuteranopia: {
    primary: [0, 40, 120], // Navy blue (visible to deuteranopes)
    accent: [255, 180, 0], // Orange-yellow (visible to deuteranopes)
  },
  Tritanopia: {
    primary: [140, 0, 0], // Dark red (visible to tritanopes)
    accent: [200, 200, 0], // Yellow (visible to tritanopes)
  },
};

// Add these variables at the top
let isDropdownOpen = false;
let dropdownHeight = 40;
let dropdownWidth = 250;
let dropdownY = 0; // Will be set in drawOptions

let dropdownAnimationProgress = 0; // Controla a animação do dropdown (0 a 1)
let dropdownAnimationSpeed = 0.1;

let gravity = 0;
let velocityY = 0;
let groundLevel; // Nível do chão

let isPopupOpen = false;
const popupOptions = ["Continuar", "Opções", "Voltar ao Menu"];
let popupButtonWidth = 200;
let popupButtonHeight = 50;

let eskinePracima = [];
let currentUpFrame = 0;
let upFrameCounter = 0;
const UP_FRAME_DELAY = 8; // Slightly slower than run animation

let eskinePrabaixo = [];
let currentDownFrame = 0;
let downFrameCounter = 0;
const DOWN_FRAME_DELAY = 8; // Same as UP_FRAME_DELAY for consistency

// Add these constants at the top of your file with other constants
const COIN_SPAWN_POINTS = [
  { x: 200, y: 200 },
  { x: 400, y: 300 },
  { x: 600, y: 400 },
  { x: 800, y: 200 },
  { x: 1000, y: 300 },
  { x: 1200, y: 400 },
  // Add more spawn points as needed
];

const POWER_UP_SPAWN_POINTS = [
  { x: 200, y: 200 },
  { x: 400, y: 300 },
  { x: 600, y: 400 },
  { x: 800, y: 200 },
  { x: 1000, y: 300 },
  { x: 1200, y: 400 },
]

const HEALTH_SPAWN_POINTS = [
  { x: 200, y: 200 },
  { x: 400, y: 300 },
  { x: 600, y: 400 },
  { x: 800, y: 200 },
  { x: 1000, y: 300 },
  { x: 1200, y: 400 },
]

// Add these constants at the top of your file
const INITIAL_LASER_SPAWN_RATE = 50; // Initial frames between laser spawns
const MIN_LASER_SPAWN_RATE = 15; // Minimum frames between laser spawns
const LASER_SPAWN_DECREASE = 10; // How much to decrease spawn rate per coin collected

// Add to your variables at the top of the file
let bgImage;

// Add these constants at the top of your file
const HEALTH_SPAWN_RATE = 600; // Frames between health spawns (10 seconds at 60fps)
const HEALTH_AMOUNT = 15; // Amount of health restored
let framesSinceLastHealth = 0;
let healthPickups = [];

// Add these constants at the top of your file
const INVINCIBILITY_DURATION = 600; // 10 seconds (60fps * 10)
const INVINCIBILITY_SPAWN_RATE = 900; // 15 seconds between spawns
let framesSinceLastInvincibility = 0; 
let invincibilityPickups = [];
let isInvincible = false;
let invincibilityTimer = 0;

// Add to the variables at the top of the file
let invincibilityFlashTimer = 0;
const FLASH_INTERVAL = 10; // Controls how fast the invincibility effect flashes

let healthSound;

function preload() {
  customFont = loadFont("assets/fonts/BebasNeue-Regular.ttf"); // Carrega a fonte
  bgMusic = loadSound(
    "assets/sounds/music/Iframe RESENHA DO ARROCHA 1.0 - J. ESKINE - CALMA VIDA TÁ DE BOA [Q9VAdq223VU].mp3"
  );

  eskineParado = loadImage("assets/sprites/eskine/eskine-parado.png");
  eskinePulando = loadImage("assets/sprites/eskine/eskine-pulando.png");
  eskineParadoEsquerda = loadImage(
    "assets/sprites/eskine/eskine-parado-esquerda.png"
  );
  eskinePulandoEsquerda = loadImage(
    "assets/sprites/eskine/eskine-pulando-esquerda.png"
  );
  eskineCorrendoFrames[0] = loadImage(
    "assets/sprites/eskine/eskine-correndo-1.png"
  );
  eskineCorrendoFrames[1] = loadImage(
    "assets/sprites/eskine/eskine-correndo-2.png"
  );
  eskineCorrendoFrames[2] = loadImage(
    "assets/sprites/eskine/eskine-correndo-3.png"
  );

  eskineCorrendoEsquerdaFrames[0] = loadImage(
    "assets/sprites/eskine/eskine-correndo-1-esquerda.png"
  );
  eskineCorrendoEsquerdaFrames[1] = loadImage(
    "assets/sprites/eskine/eskine-correndo-2-esquerda.png"
  );
  eskineCorrendoEsquerdaFrames[2] = loadImage(
    "assets/sprites/eskine/eskine-correndo-3-esquerda.png"
  );

  eskineMorrendo = loadImage("assets/sprites/eskine/eskine-morrendo.png");
  eskineAgachado = loadImage("assets/sprites/eskine/eskine-agachado.png");

  jumpSound = loadSound("assets/sounds/sfx/eskine-pulando.mp3");
  hitSound = loadSound("assets/sounds/sfx/eskine-tomando.wav");
  coinSound = loadSound("assets/sounds/sfx/moeda.wav");

  eskinePracima = [];
  eskinePracima[0] = loadImage("assets/sprites/eskine/eskine-pracima-1.png");
  eskinePracima[1] = loadImage("assets/sprites/eskine/eskine-pracima-2.png");

  eskinePrabaixo = [];
  eskinePrabaixo[0] = loadImage("assets/sprites/eskine/eskine-prabaixo-1.png");
  eskinePrabaixo[1] = loadImage("assets/sprites/eskine/eskine-prabaixo-2.png");

  // Add to preload function
  bgImage = loadImage("assets/bg-bahia.png");

  healthSound = loadSound("assets/sounds/sfx/health.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareX = windowWidth / 2;
  squareY = windowHeight / 2;
  textFont(customFont);

  bgMusic.setVolume(musicVolume);

  // Adicionar listener para controles
  window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected:", e.gamepad);
    gamepadConnected = true;
    gamepadIndex = e.gamepad.index;
  });

  window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected:", e.gamepad);
    if (e.gamepad.index === gamepadIndex) {
      gamepadConnected = false;
      gamepadIndex = null;
    }
  });

  groundLevel = height - 100;
}

function draw() {
  background(245, 239, 235);

  updateHoverStates();

  checkGamepadConnection();

  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "game") {
    drawGame();
    if (isPopupOpen) {
      drawPopup();
    }
  } else if (gameState === "options") {
    drawOptions();
  } else if (gameState === "music") {
    drawMusicSelection();
  }

  if (navigator.getGamepads && navigator.getGamepads()[0]) {
    if (!gamepadConnected) {
      gamepadConnected = true;
      gamepadIndex = 0;
    }
  } else if (gamepadConnected) {
    gamepadConnected = false;
    gamepadIndex = null;
  }
}

// Add mouseDragged function
function mouseDragged() {
  if (gameState === "options") {
    if (isDragging) {
      let newX = constrain(
        mouseX,
        width / 2 - sliderWidth / 2,
        width / 2 + sliderWidth / 2
      );
      musicVolume = map(
        newX,
        width / 2 - sliderWidth / 2,
        width / 2 + sliderWidth / 2,
        0,
        1
      );
      bgMusic.setVolume(musicVolume);
    }
    if (isDraggingSFX) {
      let newX = constrain(
        mouseX,
        width / 2 - sliderWidth / 2,
        width / 2 + sliderWidth / 2
      );
      sfxVolume = map(
        newX,
        width / 2 - sliderWidth / 2,
        width / 2 + sliderWidth / 2,
        0,
        1
      );
    }
  }
}

// Modify the checkGamepadInput function
function checkGamepadInput() {
  if (!gamepadConnected) return { moveX: 0, moveY: 0, buttons: { jump: false, crouch: false } };

  const gamepads = navigator.getGamepads();
  if (!gamepads || !gamepads[0]) return { moveX: 0, moveY: 0, buttons: { jump: false, crouch: false } };

  const gamepad = gamepads[0];
  
  // Eixos do analógico esquerdo (axes 0 e 1)
  let moveX = gamepad.axes[0] || 0;
  let moveY = gamepad.axes[1] || 0;

  // Aplicar zona morta
  if (Math.abs(moveX) < GAMEPAD_DEADZONE) moveX = 0;
  if (Math.abs(moveY) < GAMEPAD_DEADZONE) moveY = 0;

  // Verificar botões (A=0, B=1, X=2, Y=3 nos controles padrão)
  const buttons = {
    jump: gamepad.buttons[0]?.pressed || false,
    crouch: gamepad.buttons[2]?.pressed || false
  };

  return { moveX, moveY, buttons };
}

function keyPressed() {
  if (keyCode === ESCAPE && gameState === "game" && !isDead) {
    isPopupOpen = !isPopupOpen; // Toggle popup state
  }
}

function checkGamepadConnection() {
  const gamepads = navigator.getGamepads();
  const hasGamepad = gamepads && gamepads[0] && gamepads[0].connected;
  
  if (hasGamepad && !gamepadConnected) {
    gamepadConnected = true;
    gamepadIndex = 0;
    console.log("Controle conectado:", gamepads[0].id);
  } else if (!hasGamepad && gamepadConnected) {
    gamepadConnected = false;
    gamepadIndex = null;
    console.log("Controle desconectado");
  }
}

// Add mouseReleased function
function mouseReleased() {
  isDragging = false;
  isDraggingSFX = false;
}

function drawMenu() {
  const currentScheme = colorSchemes[colorMode];

  // Title
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(currentScheme.primary);
  text("Arrocha\nThe Game", width / 2, height / 4);

  // Style for buttons
  textAlign(CENTER, CENTER);
  textSize(24);

  // Play button
  let playY = height / 2 - 120;
  drawButton("Jogar no Coroa", width / 2, playY, currentScheme);

  let musicY = height / 2 - 40;
  drawButton("Trocar Música", width / 2, musicY, currentScheme);

  // Options button
  let optionsY = height / 2 + 40;
  drawButton("Opções", width / 2, optionsY, currentScheme);

  // Exit button
  let exitY = height / 2 + 120;
  drawButton("Soltar a Carta", width / 2, exitY, currentScheme);

  // Botão de troca de controle
  drawControlSchemeButton();
}

function drawButton(
  label,
  x,
  y,
  scheme,
  btnWidth = buttonWidth,
  btnHeight = buttonHeight
) {
  push();
  translate(x, y);

  if (!buttonHoverStates[label]) buttonHoverStates[label] = 0;
  const isHover = isMouseOverButton(x, y, btnWidth, btnHeight);
  buttonHoverStates[label] = lerp(
    buttonHoverStates[label],
    isHover ? 1 : 0,
    hoverSpeed
  );

  const primaryColor = color(
    scheme.primary[0],
    scheme.primary[1],
    scheme.primary[2]
  );
  const accentColor = color(
    scheme.accent[0],
    scheme.accent[1],
    scheme.accent[2]
  );

  const hoverColor = lerpColor(primaryColor, accentColor, 0.22);
  const currentColor = lerpColor(
    primaryColor,
    hoverColor,
    buttonHoverStates[label]
  );

  fill(currentColor);
  stroke(currentColor);
  strokeWeight(12);
  strokeJoin(ROUND);

  rect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight);

  fill(lerpColor(accentColor, color(255), hoverLerp));
  noStroke();
  text(label, 0, 0);

  pop();
}

function isMouseOverButton(
  x,
  y,
  btnWidth = buttonWidth,
  btnHeight = buttonHeight
) {
  return (
    mouseX > x - btnWidth / 2 &&
    mouseX < x + btnWidth / 2 &&
    mouseY > y - btnHeight / 2 &&
    mouseY < y + btnHeight / 2
  );
}

let popupHeight = 300;
function mousePressed() {
  if (gameState === "menu") {
    // Verifica se o botão de troca de controle foi clicado
    if (isMouseOverButton(width - 100, 50, 100, 40)) {
      controlScheme = controlScheme === "WASD" ? "ARROWS" : "WASD";
    }
    // Restante do código do menu...
    else if (isMouseOverButton(width / 2, height / 2 - 120)) {
      if (!bgMusic.isPlaying()) {
        bgMusic.setVolume(musicVolume);
        bgMusic.loop();
      }
      gameState = "game";
    } else if (isMouseOverButton(width / 2, height / 2 - 40)) {
      gameState = "music";
    } else if (isMouseOverButton(width / 2, height / 2 + 40)) {
      gameState = "options";
    } else if (isMouseOverButton(width / 2, height / 2 + 120)) {
      window.close();
      const confirmExit = confirm("Você realmente quer sair do jogo?");
      if (confirmExit) {
        window.location.href = "about:blank";
      }
    }
  } else if (gameState === "music") {
    // Check song selections
    for (let i = 0; i < songs.length; i++) {
      let songY = height / 2 - 60 + i * 70;
      if (isMouseOverButton(width / 2, songY)) {
        if (currentSongIndex !== i) {
          currentSongIndex = i;
          bgMusic.stop();
          bgMusic = loadSound(songs[i].file, () => {
            bgMusic.setVolume(musicVolume);
            bgMusic.loop();
          });
        }
        break;
      }
    }

    // Back button
    if (isMouseOverButton(width / 2, height - 100)) {
      gameState = "menu";
    }
  } else if (gameState === "game") {
    if (isPopupOpen) {
      let popupX = width / 2;
      let popupY = height / 2;

      for (let i = 0; i < popupOptions.length; i++) {
        let optionY = -popupHeight / 2 + 80 + i * 70;
        if (isMouseOverPopupButton(0, optionY)) {
          // Coordenadas relativas
          handlePopupOption(popupOptions[i]);
          break;
        }
      }
    } else {
      if (isMouseOverButton(50, 50)) {
        isPopupOpen = true;
      }
    }
  } else if (gameState === "options") {
    // Check if back button is clicked
    if (isMouseOverButton(width / 2, height - 100)) {
      gameState = "menu";
    }
    // Check if clicking on slider
    if (mouseY > sliderY - 10 && mouseY < sliderY + 10) {
      isDragging = true;
    }

    if (mouseY > sliderY2 - 10 && mouseY < sliderY2 + 10) {
      isDraggingSFX = true;
    }

    // Check if clicking dropdown
    let dropdownX = width / 2;
    if (
      mouseX > dropdownX - dropdownWidth / 2 &&
      mouseX < dropdownX + dropdownWidth / 2 &&
      mouseY > dropdownY - dropdownHeight / 2 &&
      mouseY < dropdownY + dropdownHeight / 2
    ) {
      isDropdownOpen = !isDropdownOpen;
    }
    // Check dropdown options if open
    else if (isDropdownOpen) {
      for (let i = 0; i < colorModes.length; i++) {
        let optionY = dropdownY + (i + 1) * dropdownHeight;
        if (
          mouseX > dropdownX - dropdownWidth / 2 &&
          mouseX < dropdownX + dropdownWidth / 2 &&
          mouseY > optionY - dropdownHeight / 2 &&
          mouseY < optionY + dropdownHeight / 2
        ) {
          colorMode = colorModes[i];
          isDropdownOpen = false;
          break;
        }
      }
    }

    // This click outside dropdown check needs to happen separately
    // Only close if we clicked outside AND the dropdown is open
    if (
      isDropdownOpen &&
      !(
        mouseX > dropdownX - dropdownWidth / 2 &&
        mouseX < dropdownX + dropdownWidth / 2 &&
        mouseY > dropdownY - dropdownHeight / 2 &&
        mouseY < dropdownY + (colorModes.length + 1) * dropdownHeight
      )
    ) {
      isDropdownOpen = false;
    }
  }
}

function isMouseOverPopupButton(buttonX, buttonY) {
  // Converter coordenadas relativas do popup para absolutas
  const popupX = width / 2;
  const popupY = height / 2;
  const absoluteX = popupX + buttonX;
  const absoluteY = popupY + buttonY;

  return (
    mouseX > absoluteX - popupButtonWidth / 2 &&
    mouseX < absoluteX + popupButtonWidth / 2 &&
    mouseY > absoluteY - popupButtonHeight / 2 &&
    mouseY < absoluteY + popupButtonHeight / 2
  );
}

function drawGame() {
  // Replace the existing background call with this
  background(225,225,225)

  const currentScheme = colorSchemes[colorMode];

  if (!isPopupOpen && !isDead) {
    // Initialize movement vector
    let moveX = 0;
    let moveY = 0;

    // Verificar entrada do controle
    const gamepadInput = checkGamepadInput();

    // Combinar entrada do teclado e do controle
    if (controlScheme === "WASD") {
      if (keyIsDown(65)) moveX -= 1; // A
      if (keyIsDown(68)) moveX += 1; // D
      if (keyIsDown(87)) moveY -= 1; // W
      if (keyIsDown(83)) moveY += 1; // S
    } else {
      if (keyIsDown(LEFT_ARROW)) moveX -= 1;
      if (keyIsDown(RIGHT_ARROW)) moveX += 1;
      if (keyIsDown(UP_ARROW)) moveY -= 1;
      if (keyIsDown(DOWN_ARROW)) moveY += 1;
    }

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      const normalizer = 1 / Math.sqrt(2);
      moveX *= normalizer;
      moveY *= normalizer;
    }

    // Apply movement with boundary checks
    if (moveX !== 0) {
      const nextX = squareX + moveX * speed * speedMultiplier;
      if (nextX - 100 > 0 && nextX + 100 < width) {
        squareX = nextX;
        facingRight = moveX > 0;
      }
    }

    if (moveY !== 0) {
      const nextY = squareY + moveY * speed * speedMultiplier;
      if (nextY - 100 > 0 && nextY + 100 < height) {
        squareY = nextY;
      }
    }

    // Rest of game logic (lasers, coins, etc.)
    if (!isPopupOpen && !isDead) {
      // Calculate current spawn rate based on score
      let currentSpawnRate = 100 - (score * 1.1);
      currentSpawnRate = max(currentSpawnRate, MIN_LASER_SPAWN_RATE);
  
      // Spawn new lasers
      framesSinceLastLaser++;
      if (framesSinceLastLaser >= currentSpawnRate / speedMultiplier) {
        lasers.push(new Laser());
        framesSinceLastLaser = 0;
      }
  
      // Update and draw lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        if (lasers[i].update()) {
          lasers.splice(i, 1);
          continue;
        }
  
        if (lasers[i].hits(squareX, squareY, 200, 200)) {
          damagePlayer(LASER_DAMAGE);
          lasers.splice(i, 1);
          continue;
        }
  
        lasers[i].draw(currentScheme);
      }
  
      // Spawn new coins
      framesSinceLastCoin++;
      if (framesSinceLastCoin >= COIN_SPAWN_RATE) {
        // Only spawn new coin if there are less than X coins
        if (coins.length < 5) {
          // Adjust maximum number of coins as needed
          coins.push(new Coin());
        }
        framesSinceLastCoin = 0;
      }
  
      // Update and draw coins
      for (let i = coins.length - 1; i >= 0; i--) {
        if (coins[i].update()) {
          coins.splice(i, 1);
          continue;
        }
  
        if (coins[i].hits(squareX, squareY, 200, 200)) {
          score++;
          coins.splice(i, 1);
  
          if (coinSound) {
            coinSound.setVolume(sfxVolume);
            coinSound.play();
          }
  
          if (score % COINS_FOR_SPEEDUP === 0) {
            speedMultiplier += SPEED_INCREASE;
          }
          continue;
        }
  
        coins[i].draw();
      }
  
      // Spawn new health pickups
      framesSinceLastHealth++;
      if (framesSinceLastHealth >= HEALTH_SPAWN_RATE) {
        healthPickups.push(new HealthPickup());
        framesSinceLastHealth = 0;
      }
  
      // Update and draw health pickups
      for (let i = healthPickups.length - 1; i >= 0; i--) {
        if (healthPickups[i].update()) {
          healthPickups.splice(i, 1);
          continue;
        }
  
        if (healthPickups[i].hits(squareX, squareY, 200, 200)) {
          playerHealth = min(playerHealth + HEALTH_AMOUNT, 100);
          healthPickups.splice(i, 1);
          if (healthSound) {
            healthSound.setVolume(sfxVolume);
            healthSound.play();
          }
          continue;
        }
  
        healthPickups[i].draw();
      }
  
      // Invincibility power-up spawning and update
      framesSinceLastInvincibility++;
      if (framesSinceLastInvincibility >= INVINCIBILITY_SPAWN_RATE) {
        if (invincibilityPickups.length < 1) { // Only one star at a time
          invincibilityPickups.push(new InvincibilityPickup());
        }
        framesSinceLastInvincibility = 0;
      }
  
      // Update invincibility timer
      if (isInvincible) {
        invincibilityTimer--;
        if (invincibilityTimer <= 0) {
          isInvincible = false;
        }
      }
  
      // Update and draw invincibility pickups
      for (let i = invincibilityPickups.length - 1; i >= 0; i--) {
        if (invincibilityPickups[i].update()) {
          invincibilityPickups.splice(i, 1);
          continue;
        }
  
        if (invincibilityPickups[i].hits(squareX, squareY, 200, 200)) {
          isInvincible = true;
          invincibilityTimer = INVINCIBILITY_DURATION;
          invincibilityPickups.splice(i, 1);
          if (coinSound) {
            coinSound.setVolume(sfxVolume);
            coinSound.play();
          }
          continue;
        }
  
        invincibilityPickups[i].draw();
      }
    }
  }

  // Draw rest of UI elements
  // Desenhar o personagem
  push();
  imageMode(CENTER);

  if (isDead) {
    image(eskineMorrendo, squareX, squareY, 400, 400);

    push();
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(currentScheme.primary);
    text("ACABOU O ARROCHA!", width / 2, height / 2 - 50);
    pop();
  } else {
    // Add invincibility visual effect
    if (isInvincible) {
      invincibilityFlashTimer++;
      if (invincibilityFlashTimer % FLASH_INTERVAL < FLASH_INTERVAL/2) {
        tint(255, 255, 0, 200); // Yellow tint
      } else {
        tint(255, 255, 255, 200); // Normal with slight transparency
      }
      
      // Draw invincibility timer
      push();
      textAlign(CENTER);
      textSize(20);
      fill(255, 255, 0);
      stroke(0);
      strokeWeight(2);
      text(`Invencível: ${Math.ceil(invincibilityTimer/60)}s`, squareX, squareY - 100);
      pop();

      if (gamepadConnected) {
        push();
        fill(0, 255, 0);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(20);
        text("🎮", 20, 20);
        pop();
      }
    }

    // Check for downward movement first, then upward, then horizontal
    if (
      (controlScheme === "WASD" && keyIsDown(83)) ||
      (controlScheme === "ARROWS" && keyIsDown(DOWN_ARROW))
    ) {
      downFrameCounter++;
      if (downFrameCounter >= DOWN_FRAME_DELAY) {
        currentDownFrame = (currentDownFrame + 1) % 2;
        downFrameCounter = 0;
      }
      image(eskinePrabaixo[currentDownFrame], squareX, squareY, 300, 300);
    } else if (
      (controlScheme === "WASD" && keyIsDown(87)) ||
      (controlScheme === "ARROWS" && keyIsDown(UP_ARROW))
    ) {
      upFrameCounter++;
      if (upFrameCounter >= UP_FRAME_DELAY) {
        currentUpFrame = (currentUpFrame + 1) % 2;
        upFrameCounter = 0;
      }
      image(eskinePracima[currentUpFrame], squareX, squareY, 300, 300);
    } else if (facingRight) {
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        frameCounter++;
        if (frameCounter >= FRAME_DELAY) {
          currentRunFrame = (currentRunFrame + 1) % 3;
          frameCounter = 0;
        }
        image(
          eskineCorrendoFrames[currentRunFrame],
          squareX,
          squareY,
          400,
          400
        );
      } else {
        image(eskineParado, squareX, squareY, 200, 200);
      }
    } else {
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        frameCounter++;
        if (frameCounter >= FRAME_DELAY) {
          currentRunFrame = (currentRunFrame + 1) % 3;
          frameCounter = 0;
        }
        image(
          eskineCorrendoEsquerdaFrames[currentRunFrame],
          squareX,
          squareY,
          400,
          400
        );
      } else {
        image(eskineParadoEsquerda, squareX, squareY, 200, 200);
      }
    }
  }
  pop();

  // Botão do menu
  push();
  textSize(24);
  translate(0, 0);
  textAlign(CENTER, CENTER);
  drawButton("Menu", 50, 50, colorSchemes[colorMode], 60, 60);

  // Draw health bar
  const healthBarWidth = 200;
  const healthBarHeight = 20;
  const healthBarX = 130; // Position after menu button
  const healthBarY = 50;

  // Health bar background
  fill(100);
  noStroke();
  rect(healthBarX, healthBarY - healthBarHeight/2, healthBarWidth, healthBarHeight, 10);

  // Health bar fill
  const healthPercent = playerHealth / 100;
  const healthColor = lerpColor(
    color(255, 0, 0),   // Red when low health
    color(0, 255, 0),   // Green when full health
    healthPercent
  );
  
  fill(healthColor);
  rect(
    healthBarX, 
    healthBarY - healthBarHeight/2,
    healthBarWidth * healthPercent,
    healthBarHeight,
    10
  );

  // Health text
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(`${playerHealth}%`, healthBarX + healthBarWidth/2, healthBarY);
  pop();

  // ...rest of drawGame code...
  //pop();


  push();
  textAlign(LEFT, CENTER);
  textSize(32);
  fill(currentScheme.primary);
  

  
  // Draw score
  
  //stroke(0)
  fill(currentScheme.primary);
  text(`Moedas: ${score}`, width/2, 50);
  pop();

  // Botão de troca de controle
  drawControlSchemeButton();

  // Pop-up
  if (isPopupOpen) {
    push();
    resetMatrix();
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawPopup();
    pop();
  }
}

function damagePlayer(amount) {
  if (!isDead && !isInvincible) {  // Check invincibility before applying damage
    playerHealth = Math.max(0, playerHealth - amount);

    if (hitSound) {
      hitSound.setVolume(sfxVolume);
      hitSound.play();
    }

    if (playerHealth <= 0) {
      isDead = true;
      setTimeout(() => {
        gameState = "menu";
        resetGameState();
      }, 2000); // Wait 2 seconds before returning to menu
    }
  }
}

function drawControlSchemeButton() {
  const currentScheme = colorSchemes[colorMode];
  const buttonX = width - 100; // Posição no canto superior direito
  const buttonY = 50;

  drawButton(controlScheme, buttonX, buttonY, currentScheme, 100, 40);
}

function handlePopupOption(option) {
  console.log("Opção clicada:", option);
  if (option === "Continuar") {
    isPopupOpen = false;
  } else if (option === "Opções") {
    gameState = "options";
    isPopupOpen = false;
  } else if (option === "Voltar ao Menu") {
    gameState = "menu";
    isPopupOpen = false;
    resetGameState();
    bgMusic.stop(); // Parar música ao voltar ao menu
  }
}

function drawOptions() {
  const currentScheme = colorSchemes[colorMode] || colorSchemes["Normal"];

  // Title
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(
    currentScheme.primary[0],
    currentScheme.primary[1],
    currentScheme.primary[2]
  );
  text("Opções", width / 2, height / 4);

  // Music Volume section
  fill(currentScheme.accent);
  textSize(24);
  text("Volume da Música", width / 2, height / 2 - 120);

  // Draw music slider

  sliderX = width / 2;
  sliderY = height / 2 - 70;

  // Music Slider track
  stroke(currentScheme.primary);
  strokeWeight(2);
  line(sliderX - sliderWidth / 2, sliderY, sliderX + sliderWidth / 2, sliderY);

  // Music Slider handle
  let handleX = map(
    musicVolume,
    0,
    1,
    sliderX - sliderWidth / 2,
    sliderX + sliderWidth / 2
  );
  fill(currentScheme.accent);
  noStroke();
  circle(handleX, sliderY, 20);

  // SFX Volume section
  text("Volume dos Efeitos", width / 2, height / 2 - 20);

  // Draw SFX slider
  sliderX2 = width / 2;
  sliderY2 = height / 2 + 30;

  // SFX Slider track
  stroke(currentScheme.primary);
  strokeWeight(2);
  line(sliderX2 - sliderWidth / 2, sliderY2, sliderX2 + sliderWidth / 2, sliderY2);

  // SFX Slider handle
  let handleX2 = map(
    sfxVolume,
    0,
    1,
    sliderX2 - sliderWidth / 2,
    sliderX2 + sliderWidth / 2
  );
  fill(currentScheme.accent);
  noStroke();
  circle(handleX2, sliderY2, 20);

  // Rest of options...
  text("Modo de Cor", width / 2, height / 2 + 100);
  dropdownY = height / 2 + 150;
  drawDropdown(width / 2, dropdownY);
  drawButton("Voltar", width / 2, height - 100, currentScheme);
}

// Add new function for color mode buttons
function drawColorButton(mode, x, y) {
  push();
  translate(x, y);

  let isSelected = mode === colorMode;
  const isHover =
    mouseX > x - 125 && mouseX < x + 125 && mouseY > y - 20 && mouseY < y + 20;

  // Cores com hover
  const baseColor = color(
    colorSchemes[mode].primary[0],
    colorSchemes[mode].primary[1],
    colorSchemes[mode].primary[2]
  );
  const hoverColor = color(
    colorSchemes[mode].accent[0],
    colorSchemes[mode].accent[1],
    colorSchemes[mode].accent[2]
  );
  const currentColor = lerpColor(baseColor, hoverColor, isHover ? 0.2 : 0);

  fill(isSelected ? hoverColor : currentColor);
  stroke(isSelected ? baseColor : hoverColor);
  strokeWeight(2);
  rect(-125, -20, 250, 40, 10);

  fill(isSelected ? baseColor : hoverColor);
  noStroke();
  text(mode, 0, 0);

  pop();
}

function drawMusicSelection() {
  const currentScheme = colorSchemes[colorMode];

  // Title
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(currentScheme.primary);
  text("Seleção de Música", width / 2, height / 4); // Moved title up

  // List songs with more spacing
  textSize(24);
  const spacing = 80; // Increased spacing between buttons
  const startY = height / 3 + 80; // Start buttons higher on screen

  for (let i = 0; i < songs.length; i++) {
    let songY = startY + i * spacing;
    let isSelected = i === currentSongIndex;

    // Song button
    push();
    if (isSelected) {
      fill(currentScheme.accent);
    }
    drawButton(songs[i].name, width / 2, songY, currentScheme);
    pop();
  }

  // Back button - moved further down
  drawButton("Voltar", width / 2, height - 80, currentScheme);
}

function drawPopup() {
  const currentScheme = colorSchemes[colorMode];

  // Fundo semi-transparente com coordenadas absolutas
  push();
  resetMatrix();
  drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  fill(0, 150);
  noStroke();
  rect(0, 0, width, height);
  pop();

  // Conteúdo do pop-up com posicionamento centralizado
  const popupWidth = 300;
  const popupHeight = 300;
  const popupX = width / 2;
  const popupY = height / 2;

  push();
  translate(popupX, popupY); // Origem no centro do pop-up

  // Caixa principal
  fill(currentScheme.primary);
  stroke(currentScheme.accent);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, popupWidth, popupHeight, 20);

  // Opções com posicionamento relativo ao centro
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(currentScheme.accent);

  for (let i = 0; i < popupOptions.length; i++) {
    const optionY = -popupHeight / 2 + 80 + i * 70;
    drawPopupButton(popupOptions[i], 0, optionY, currentScheme);
  }

  pop();
}

function drawPopupButton(label, x, y, scheme) {
  push();
  translate(x, y); // Posicionamento relativo ao centro do pop-up

  // Inicializar estado de hover para cada botão
  if (!popupHoverStates[label]) popupHoverStates[label] = 0;
  const isHover = isMouseOverPopupButton(x, y);
  popupHoverStates[label] = lerp(
    popupHoverStates[label],
    isHover ? 1 : 0,
    popupHoverSpeed
  );

  // Cores com transição suave
  const primaryColor = color(
    scheme.primary[0],
    scheme.primary[1],
    scheme.primary[2]
  );
  const accentColor = color(
    scheme.accent[0],
    scheme.accent[1],
    scheme.accent[2]
  );

  fill(lerpColor(primaryColor, accentColor, popupHoverStates[label] * 0.3));
  stroke(lerpColor(accentColor, primaryColor, popupHoverStates[label] * 0.3));

  strokeWeight(2);
  rect(0, 0, popupButtonWidth, popupButtonHeight, 10);

  fill(lerpColor(accentColor, primaryColor, popupHoverStates[label] * 0.3));
  noStroke();
  text(label, 0, 0);

  pop();
}

function updateHoverStates() {
  // Atualizar estados de hover dos botões do pop-up
  if (isPopupOpen) {
    const popupX = width / 2;
    const popupY = height / 2;

    for (let i = 0; i < popupOptions.length; i++) {
      const optionY = -150 + 80 + i * 70;
      const label = popupOptions[i];
      const isHover = isMouseOverPopupButton(0, optionY);

      if (!popupHoverStates[label]) popupHoverStates[label] = 0;
      popupHoverStates[label] = lerp(
        popupHoverStates[label],
        isHover ? 1 : 0,
        popupHoverSpeed
      );
    }
  }
}

// Add new dropdown drawing function
function drawDropdown(x, y) {
  push();
  const currentScheme = colorSchemes[colorMode];

  // Draw main dropdown button
  fill(220);
  stroke(
    currentScheme.primary[0],
    currentScheme.primary[1],
    currentScheme.primary[2]
  );
  strokeWeight(2);
  rect(
    x - dropdownWidth / 2,
    y - dropdownHeight / 2,
    dropdownWidth,
    dropdownHeight,
    10
  );

  // Draw dropdown arrow
  let arrowX = x + dropdownWidth / 2 - 30;
  let arrowY = y;
  fill(
    currentScheme.primary[0],
    currentScheme.primary[1],
    currentScheme.primary[2]
  );
  noStroke();
  triangle(
    arrowX - 10,
    arrowY - 5,
    arrowX + 10,
    arrowY - 5,
    arrowX,
    arrowY + 5
  );

  // Aqui está o texto do botão principal do dropdown
  // Mostra a opção atualmente selecionada (colorMode)
  fill(
    currentScheme.primary[0],
    currentScheme.primary[1],
    currentScheme.primary[2]
  );
  textAlign(LEFT, CENTER);
  textSize(20);
  text(colorMode, x - dropdownWidth / 2 + 20, y);

  // Animate dropdown opening/closing
  if (isDropdownOpen) {
    dropdownAnimationProgress = 1; // Sem animação para debug
  } else {
    dropdownAnimationProgress = 0;
  }

  // Draw dropdown options if open
  if (dropdownAnimationProgress > 0) {
    for (let i = 0; i < colorModes.length; i++) {
      let optionY = y + (i + 1) * dropdownHeight;

      // Option background with hover and selected state
      if (colorModes[i] === colorMode) {
        fill(200); // Selected color
      } else if (
        mouseX > x - dropdownWidth / 2 &&
        mouseX < x + dropdownWidth / 2 &&
        mouseY > optionY - dropdownHeight / 2 &&
        mouseY < optionY + dropdownHeight / 2
      ) {
        fill(210); // Hover color
      } else {
        fill(220); // Normal color
      }

      // Draw shadow for depth
      drawingContext.shadowColor = "rgba(0, 0, 0, 0.2)";
      drawingContext.shadowBlur = 5;
      drawingContext.shadowOffsetY = 2;

      stroke(
        currentScheme.primary[0],
        currentScheme.primary[1],
        currentScheme.primary[2]
      );
      strokeWeight(1);
      rect(
        x - dropdownWidth / 2,
        optionY - dropdownHeight / 2,
        dropdownWidth,
        dropdownHeight,
        5
      );

      // Reset shadow
      drawingContext.shadowColor = "transparent";

      // Aqui está o texto de cada opção do dropdown
      fill(
        currentScheme.primary[0],
        currentScheme.primary[1],
        currentScheme.primary[2]
      );
      noStroke();
      textAlign(LEFT, CENTER);
      text(colorModes[i], x - dropdownWidth / 2 + 20, optionY);
    }
  }
  pop();
}

function resetGameState() {
  squareX = windowWidth / 2;
  squareY = windowHeight / 2;
  velocityY = 0;
  isPopupOpen = false;

  // Reinicie estados de escala dos botões
  buttonScales = {};
  targetScales = {};

  playerHealth = 100;
  isDead = false;
  isCrouching = false;

  if (jumpSound && jumpSound.isPlaying()) {
    jumpSound.stop();
  }

  if (hitSound && hitSound.isPlaying()) {
    hitSound.stop();
  }

  if (coinSound && coinSound.isPlaying()) {
    coinSound.stop();
  }

  if (healthSound && healthSound.isPlaying()) {
    healthSound.stop();
  }

  lasers = [];
  framesSinceLastLaser = 0;

  score = 0;
  speedMultiplier = 1;
  coins = [];
  framesSinceLastCoin = 0;

  healthPickups = [];
  framesSinceLastHealth = 0;

  isInvincible = false;
  invincibilityTimer = 0;
  invincibilityFlashTimer = 0;
  invincibilityPickups = [];
  framesSinceLastInvincibility = 0

  // Forçar redesenho imediato
  redraw();
}

function handlePopupOption(option) {
  console.log("Opção clicada:", option);
  if (option === "Continuar") {
    isPopupOpen = false;
  } else if (option === "Opções") {
    gameState = "options";
    isPopupOpen = false;
  } else if (option === "Voltar ao Menu") {
    gameState = "menu";
    isPopupOpen = false;
    resetGameState(); // Reinicia variáveis críticas
    loop(); // Reinicia o loop de renderização (se necessário)
  }
}

class Laser {
  constructor() {
    this.isVertical = Math.random() < VERTICAL_LASER_CHANCE;
    
    // Calculate spawn position
    if (this.isVertical) {
      const spawnRange = 300;
      this.x = constrain(
        random(squareX - spawnRange/2, squareX + spawnRange/2),
        100,
        width - 100
      );
      this.y = -20;
    } else {
      this.x = width + 20;
      const spawnRange = 200;
      this.y = constrain(
        random(squareY - spawnRange/2, squareY + spawnRange/2),
        100,
        height - 100
      );
    }

    // Calculate angle and velocity towards player
    const dx = squareX - this.x;
    const dy = squareY - this.y;
    this.angle = Math.atan2(dy, dx);
    
    // Calculate velocity components
    this.vx = Math.cos(this.angle) * LASER_SPEED * speedMultiplier;
    this.vy = Math.sin(this.angle) * LASER_SPEED * speedMultiplier;

    this.width = 8;
    this.height = 40;
  }

  update() {
    // Move using velocity components
    this.x += this.vx;
    this.y += this.vy;

    // Return true if laser is off screen
    return (
      this.x < -this.width ||
      this.x > width + this.width ||
      this.y < -this.height ||
      this.y > height + this.height
    );
  }

  draw(scheme) {
    push();
    translate(this.x, this.y);
    rotate(this.angle); // Rotate laser to face movement direction
    
    // Laser beam
    fill(scheme.accent);
    stroke(0)
    strokeWeight(3);
    rect(-this.width/2, -this.height/2, this.width, this.height);

    // Glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(scheme.accent);
    rect(-this.width/2, -this.height/2, this.width, this.height);
    pop();
  }

  hits(playerX, playerY, playerWidth, playerHeight) {
    return (
      playerX - playerWidth/4 < this.x + this.width/2 &&
      playerX + playerWidth/4 > this.x - this.width/2 &&
      playerY - playerHeight/4 < this.y + this.height/2 &&
      playerY + playerHeight/4 > this.y - this.height/2
    );
  }
}

// Modify the Coin class
class Coin {
  constructor() {
    // Get a random spawn point
    const spawnPoint =
      COIN_SPAWN_POINTS[Math.floor(random(0, COIN_SPAWN_POINTS.length))];

    // Scale spawn points based on screen size
    this.x = (spawnPoint.x / 1920) * width;
    this.y = (spawnPoint.y / 1080) * height;

    this.width = 30;
    this.height = 30;
    this.rotation = 0;
    this.rotationSpeed = random(0.02, 0.08); // Different rotation speeds
    this.scaleAnimation = 0; // For spawn animation
  }

  update() {
    this.rotation += this.rotationSpeed;
    this.scaleAnimation = min(this.scaleAnimation + 0.1, 1); // Smooth appear animation

    // Optional: Make coins disappear after some time
    return false; // Don't automatically remove coins
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    // Scale animation
    const currentScale = 0.2 + 0.8 * this.scaleAnimation;
    scale(currentScale);

    fill(255, 215, 0);
    stroke(218, 165, 32);
    strokeWeight(2);
    circle(0, 0, this.width);
    pop();
  }

  hits(playerX, playerY, playerWidth, playerHeight) {
    return (
      playerX - playerWidth / 4 < this.x + this.width / 2 &&
      playerX + playerWidth / 4 > this.x - this.width / 2 &&
      playerY - playerHeight / 4 < this.y + this.height / 2 &&
      playerY + playerHeight / 4 > this.y - this.height / 2
    );
  }
}

// Add the HealthPickup class
class HealthPickup {
  constructor() {
    // Similar to Coin spawn points
    const spawnPoint = HEALTH_SPAWN_POINTS[Math.floor(random(0, HEALTH_SPAWN_POINTS.length))];
    
    this.x = (spawnPoint.x / 1920) * width;
    this.y = (spawnPoint.y / 1080) * height;
    this.width = 30;
    this.height = 30;
    this.scaleAnimation = 0;
    this.rotation = 0;
    this.floatOffset = 0;
    this.floatSpeed = 0.05;
  }

  update() {
    this.scaleAnimation = min(this.scaleAnimation + 0.1, 1);
    this.floatOffset = sin(frameCount * this.floatSpeed) * 5;
    this.rotation += 0.02;
    return false;
  }

  draw() {
    push();
    translate(this.x, this.y + this.floatOffset);
    //rotate(this.rotation);
    
    // Scale animation
    const currentScale = 0.2 + 0.8 * this.scaleAnimation;
    scale(currentScale);
    
    // Draw red cross
    
    strokeWeight(0);
    fill(255, 0, 0);
    
    // Cross shape
    rect(-15, -5, 30, 10, 5);
    rect(-5, -15, 10, 30, 5);
    
    // Glow effect
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(255, 0, 0);
    
    pop();
  }

  hits(playerX, playerY, playerWidth, playerHeight) {
    return (
      playerX - playerWidth/4 < this.x + this.width/2 &&
      playerX + playerWidth/4 > this.x - this.width/2 &&
      playerY - playerHeight/4 < this.y + this.height/2 &&
      playerY + playerHeight/4 > this.y - this.height/2
    );
  }
}

// Add the InvincibilityPickup class
class InvincibilityPickup {
  constructor() {
    const spawnPoint = POWER_UP_SPAWN_POINTS[Math.floor(random(0, POWER_UP_SPAWN_POINTS.length))];
    
    this.x = (spawnPoint.x / 1920) * width;
    this.y = (spawnPoint.y / 1080) * height;
    this.width = 40;
    this.height = 40;
    this.rotation = 0;
    this.scaleAnimation = 0;
    this.floatOffset = 0;
    this.floatSpeed = 0.05;
  }

  update() {
    this.rotation += 0.03;
    this.scaleAnimation = min(this.scaleAnimation + 0.1, 1);
    this.floatOffset = sin(frameCount * this.floatSpeed) * 8;
    return false;
  }

  draw() {
    push();
    translate(this.x, this.y + this.floatOffset);
    //rotate(this.rotation);
    
    // Scale animation
    const currentScale = 0.2 + 0.8 * this.scaleAnimation;
    scale(currentScale);
    
    // Draw star
    fill(255, 255, 0); // Yellow
    stroke(255, 200, 0); // Orange
    strokeWeight(2);
    
    // Draw 5-pointed star
    beginShape();
    for (let i = 0; i < 5; i++) {
      const angle = TWO_PI * i / 5 - HALF_PI;
      const x1 = cos(angle) * 20;
      const y1 = sin(angle) * 20;
      vertex(x1, y1);
      
      const angle2 = TWO_PI * (i + 0.5) / 5 - HALF_PI;
      const x2 = cos(angle2) * 10;
      const y2 = sin(angle2) * 10;
      vertex(x2, y2);
    }
    endShape(CLOSE);
    
    // Glow effect
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(255, 255, 0);
    
    pop();
  }

  hits(playerX, playerY, playerWidth, playerHeight) {
    return (
      playerX - playerWidth/4 < this.x + this.width/2 &&
      playerX + playerWidth/4 > this.x - this.width/2 &&
      playerY - playerHeight/4 < this.y + this.height/2 &&
      playerY + playerHeight/4 > this.y - this.height/2
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
