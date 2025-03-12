let squareX;
let squareY;
const squareSize = 50;
const speed = 5;
let gameState = "menu"; // Can be 'menu' or 'game'
let buttonWidth = 200;
let buttonHeight = 50;

let musicVolume = 0;
let sfxVolume = 0.5;
let sliderX, sliderX2
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
  { name: "Resenha do Arrocha 2.0",
    file: "assets/sounds/music/Resenha2.mp3"
   },
  { name: "Resenha do Arrocha 3.0", 
    file: "assets/sounds/music/Iframe J. ESKINE - RESENHA DO ARROCHA 3.0 _ O QUE BATE É MALUQUICE [8WVQBd003VU].mp3" 
  },
  { name: "Resenha de Ex Love", 
    file: "assets/sounds/music/Iframe J. ESKINE - RESENHA DE EX-LOVE _ O QUE BATE É MALUQUICE [tvQ_TPtS9Mc].mp3" 
  },
  { name: "Mãe Solteira", 
    file: "assets/sounds/music/Iframe MÃE SOLTEIRA - J.Eskine, MC Davi, MC G15, DG e Batidão Stronda (GR6 Explode) [WpzuDyiwfSg].mp3" 
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
const LASER_DAMAGE = 20;
const LASER_SPAWN_RATE = 120; // Frames between laser spawns
let framesSinceLastLaser = 0;

let jumpSound;
let hitSound;
let coinSound;

let colorMode = "Normal";
let selectedColor = 0;
const colorModes = ["Normal", "Protanopia", "Deuteranopia", "Tritanopia"];
const colorSchemes = {
  Normal: {
    primary: [47, 65, 86], // Blue
    accent: [122, 149, 143], // Green
  },
  Protanopia: {
    primary: [0, 70, 140],    // Dark blue (appears dark to protanopes)
    accent: [255, 220, 0],    // Yellow (visible to protanopes)
  },
  Deuteranopia: {
    primary: [0, 40, 120],    // Navy blue (visible to deuteranopes)
    accent: [255, 180, 0],    // Orange-yellow (visible to deuteranopes)
  },
  Tritanopia: {
    primary: [140, 0, 0],     // Dark red (visible to tritanopes)
    accent: [200, 200, 0],    // Yellow (visible to tritanopes)
  },
};

// Add these variables at the top
let isDropdownOpen = false;
let dropdownHeight = 40;
let dropdownWidth = 250;
let dropdownY = 0; // Will be set in drawOptions

let dropdownAnimationProgress = 0; // Controla a animação do dropdown (0 a 1)
let dropdownAnimationSpeed = 0.1;

let gravity = 0.5;
let velocityY = 0;
let groundLevel; // Nível do chão

let isPopupOpen = false;
const popupOptions = ["Continuar", "Opções", "Voltar ao Menu"];
let popupButtonWidth = 200;
let popupButtonHeight = 50;

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
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareX = windowWidth / 2;
  squareY = windowHeight / 2;
  textFont(customFont);

  bgMusic.setVolume(musicVolume);

  // Auto-start audio context and music
  getAudioContext()
    .resume()
    .then(() => {
      bgMusic.loop();
      isAudioStarted = true;
    });

  groundLevel = height - 100;
}

function draw() {
  background((245, 239, 235));

  updateHoverStates();

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
}

// Add mouseDragged function
function mouseDragged() {
  if (gameState === "options") {
      if (isDragging) {
          let newX = constrain(mouseX, width/2 - sliderWidth/2, width/2 + sliderWidth/2);
          musicVolume = map(newX, width/2 - sliderWidth/2, width/2 + sliderWidth/2, 0, 1);
          bgMusic.setVolume(musicVolume);
      }
      if (isDraggingSFX) {
          let newX = constrain(mouseX, width/2 - sliderWidth/2, width/2 + sliderWidth/2);
          sfxVolume = map(newX, width/2 - sliderWidth/2, width/2 + sliderWidth/2, 0, 1);
      }
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
    if (isMouseOverButton(width / 2, height / 2 - 120)) {
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
  const currentScheme = colorSchemes[colorMode];

  // Lógica de física do jogo (só executa se não estiver pausado)
  if (!isPopupOpen && !isDead) {
    velocityY += gravity;
    squareY += velocityY;

    if (squareY + playerHeight / 2 > groundLevel) {
      squareY = groundLevel - playerHeight / 2;
      velocityY = 0;
      isJumping = false;
    }

    // Check for crouch
    if (keyIsDown(83)) {
      // Tecla S para agachar
      isCrouching = true;
    } else {
      isCrouching = false;
    }

    // Only allow horizontal movement if not crouching
    if (!isCrouching) {
      // Movimento horizontal
      if (keyIsDown(65)) { // Tecla A (esquerda)
          if (squareX - 100 > WALL_LEFT) {
              squareX -= speed * speedMultiplier;
              facingRight = false;
          }
      }
  
      if (keyIsDown(68)) { // Tecla D (direita)
          if (squareX + 100 < WALL_RIGHT) {
              squareX += speed * speedMultiplier;
              facingRight = true;
          }
      }
    }

    // Pulo (tecla Espaço)
    if (keyIsDown(32)) {
      // Tecla espaço para pular
      if (squareY + playerHeight / 2 >= groundLevel - 1) {
        // Pequeno ajuste para detectar o chão
        velocityY = -12; // Aplica a força de pulo
        isJumping = true;

        if (jumpSound) {
          jumpSound.setVolume(sfxVolume);
          jumpSound.play();
        }
      }
    }
  }

  push();
  stroke(currentScheme.primary);
  strokeWeight(4);
  // Left wall
  line(WALL_LEFT, 0, WALL_LEFT, groundLevel);
  // Right wall
  line(WALL_RIGHT, 0, WALL_RIGHT, groundLevel);
  pop();

  push();
  textAlign(LEFT, CENTER);
  textSize(24);
  fill(currentScheme.primary);
  text(`Moedas: ${score}`, 20, 50);
  text(`Velocidade: ${speedMultiplier.toFixed(1)}x`, 20, 80);
  pop();

  // Resetar todas as transformações
  // Resetar transformações ANTES do background
  resetMatrix();
  drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  background((245, 239, 235)); // Limpar fundo com sistema de coordenadas padrão

  // Inside drawGame function, where laser spawning happens
  if (!isPopupOpen && !isDead) {
    // Spawn new lasers
    framesSinceLastLaser++;
    if (framesSinceLastLaser >= LASER_SPAWN_RATE / speedMultiplier) {
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
        coins.push(new Coin());
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
          
          // Play coin sound
          if (coinSound) {
              coinSound.setVolume(sfxVolume);
              coinSound.play();
          }
      
          // Speed up every COINS_FOR_SPEEDUP coins
          if (score % COINS_FOR_SPEEDUP === 0) {
              speedMultiplier += SPEED_INCREASE;
          }
          continue;
        }

        coins[i].draw();
    }
  }

  // Desenhar elementos do jogo com isolamento
  push();
  // Chão
  stroke(currentScheme.primary);
  strokeWeight(2);
  line(0, groundLevel, width, groundLevel);
  pop();

  push();
  const healthBarWidth = 200;
  const healthBarHeight = 20;
  const healthBarX = width / 2 - 60;
  const healthBarY = 20;

  // Health bar background
  fill(100);
  noStroke();
  rect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

  // Health bar fill
  fill(playerHealth > 30 ? color(0, 255, 0) : color(255, 0, 0));
  rect(
    healthBarX,
    healthBarY,
    (healthBarWidth * playerHealth) / 100,
    healthBarHeight
  );

  // Health text
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(0)
  text(
    `Vida: ${playerHealth}/100`,
    healthBarX + healthBarWidth + 10,
    healthBarY + healthBarHeight / 2
  );
  pop();

  push();
  // Personagem
  imageMode(CENTER);

  // Escolher sprite baseado na direção e estado

  if (isDead) {
    image(eskineMorrendo, squareX, squareY, 400, 400);

    push();
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(currentScheme.primary);
    text("ACABOU O ARROCHA!", width/2, height/2 - 50);
    pop();
  } else if (isCrouching) {
    image(eskineAgachado, squareX, squareY, 400, 400);
  } else {
    if (facingRight) {
      if (velocityY < 0 || isJumping) {
        image(eskinePulando, squareX, squareY, 400, 400);
      } else if (keyIsDown(68)) {
        // If pressing D (running right)
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
      if (velocityY < 0 || isJumping) {
        image(eskinePulandoEsquerda, squareX, squareY, 400, 400);
      } else if (keyIsDown(65)) {
        // If pressing A (running left)
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

  // Botão do menu com isolamento reforçado
  push();
  textSize(24);
  translate(0, 0);
  textAlign(CENTER, CENTER); // Resetar origem
  drawButton("Menu", 50, 50, colorSchemes[colorMode], 60, 60);
  pop();

  // Pop-up com posicionamento absoluto
  if (isPopupOpen) {
    push();
    resetMatrix();
    drawingContext.setTransform(1, 0, 0, 1, 0, 0); // Escolher sprite baseado na direção e estado
    if (facingRight) {
      if (velocityY < 0 || isJumping) {
        image(eskinePulando, squareX, squareY, 400, 400);
      } else if (keyIsDown(68)) {
        // If pressing D (running right)
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
      if (velocityY < 0 || isJumping) {
        image(eskinePulandoEsquerda, squareX, squareY, 400, 400);
      } else if (keyIsDown(65)) {
        // If pressing A (running left)
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
    drawPopup();
    pop();
  }

  

  // Resetar configurações gráficas
  textAlign(LEFT, TOP);
  textSize(16);
  fill(255);
  rectMode(CORNER);
}

function damagePlayer(amount) {
  if (!isDead) {
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
  fill(currentScheme.primary[0], currentScheme.primary[1], currentScheme.primary[2]);
  text("Opções", width/2, height/4);

  // Music Volume section
  fill(currentScheme.accent);
  textSize(24);
  text("Volume da Música", width/2, height/2 - 120);

  // Draw music slider
  
  sliderX = width/2;
  sliderY = height/2 - 70;

  // Music Slider track
  stroke(currentScheme.primary);
  strokeWeight(2);
  line(sliderX - sliderWidth/2, sliderY, sliderX + sliderWidth/2, sliderY);

  // Music Slider handle
  let handleX = map(musicVolume, 0, 1, sliderX - sliderWidth/2, sliderX + sliderWidth/2);
  fill(currentScheme.accent);
  noStroke();
  circle(handleX, sliderY, 20);


  // SFX Volume section
  text("Volume dos Efeitos", width/2, height/2 - 20);

  // Draw SFX slider
  sliderX2 = width/2;
  sliderY2 = height/2 + 30;

  // SFX Slider track
  stroke(currentScheme.primary);
  strokeWeight(2);
  line(sliderX2 - sliderWidth/2, sliderY2, sliderX2 + sliderWidth/2, sliderY2);

  // SFX Slider handle
  let handleX2 = map(sfxVolume, 0, 1, sliderX2 - sliderWidth/2, sliderX2 + sliderWidth/2);
  fill(currentScheme.accent);
  noStroke();
  circle(handleX2, sliderY2, 20);

  // Rest of options...
  text("Modo de Cor", width/2, height/2 + 100);
  dropdownY = height/2 + 150;
  drawDropdown(width/2, dropdownY);
  drawButton("Voltar", width/2, height - 100, currentScheme);
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
  text("Seleção de Música", width/2, height/4); // Moved title up

  // List songs with more spacing
  textSize(24);
  const spacing = 80; // Increased spacing between buttons
  const startY = height/3 + 80; // Start buttons higher on screen

  for (let i = 0; i < songs.length; i++) {
    let songY = startY + i * spacing;
    let isSelected = i === currentSongIndex;

    // Song button
    push();
    if (isSelected) {
      fill(currentScheme.accent);
    }
    drawButton(songs[i].name, width/2, songY, currentScheme);
    pop();
  }

  // Back button - moved further down
  drawButton("Voltar", width/2, height - 80, currentScheme);
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

  lasers = [];
  framesSinceLastLaser = 0;

  score = 0;
  speedMultiplier = 1;
  coins = [];
  framesSinceLastCoin = 0;

  

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
    
    if (this.isVertical) {
      // Spawn vertical laser within a range around the player's x position
      const spawnRange = 300; // Adjustable range
      this.x = constrain(
        random(squareX - spawnRange/2, squareX + spawnRange/2), 
        100, 
        width - 100
      );
      this.y = -20;
      this.width = 8;
      this.height = 40;
    } else {
      this.x = width + 20;
      // Spawn horizontal laser within a range around the player's y position
      const spawnRange = 200; // Adjustable range
      this.y = constrain(
        random(squareY - spawnRange/2, squareY + spawnRange/2),
        groundLevel - 150,
        groundLevel - 50
      );
      this.width = 40;
      this.height = 8;
    }
    
    this.speed = LASER_SPEED * speedMultiplier;
  }

  update() {
    if (this.isVertical) {
      this.y += this.speed;
      return this.y > height + this.height; // Return true if laser is off screen
    } else {
      this.x -= this.speed;
      return this.x < -this.width; // Return true if laser is off screen
    }
  }

  draw(scheme) {
    push();
    // Laser beam
    fill(scheme.accent);
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    // Glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(scheme.accent);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  hits(playerX, playerY, playerWidth, playerHeight) {
    return (
      playerX - playerWidth/4 < this.x + this.width &&
      playerX + playerWidth/4 > this.x &&
      playerY - playerHeight/4 < this.y + this.height &&
      playerY + playerHeight/4 > this.y
    );
  }
}

class Coin {
  constructor() {
    this.x = constrain(
      random(window.innerWidth - 400, 400),
      WALL_LEFT + 50,
      WALL_RIGHT - 50
    );
    this.y = -20;
    this.width = 30;
    this.height = 30;
    this.speed = COIN_SPEED;
    this.rotation = 0;
  }

  update() {
    this.y += this.speed;
    this.rotation += 0.1;
    return this.y > height + this.height;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(255, 215, 0);
    stroke(218, 165, 32);
    strokeWeight(2);
    circle(0, 0, this.width);
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
