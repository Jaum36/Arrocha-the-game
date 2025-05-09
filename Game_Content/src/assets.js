// src/assets.js

const assets = {
  images: {},
  sounds: {},
  fonts: {}
};

function loadImage(path) {
  const img = new Image();
  img.src = path;
  return img;
}

function loadSound(path) {
  const sound = new Audio(path);
  return sound;
}

function loadFont(path) {
  const font = new FontFace('CustomFont', `url(${path})`);
  return font.load();
}

function loadAssets() {
  // Load images
  assets.images.player = loadImage('assets/sprites/player.png');
  assets.images.laser = loadImage('assets/sprites/laser.png');
  assets.images.coin = loadImage('assets/sprites/coin.png');
  assets.images.powerup = loadImage('assets/sprites/powerup.png');

  // Load sounds
  assets.sounds.bgMusic = loadSound('assets/sounds/music/background.mp3');
  assets.sounds.coinSound = loadSound('assets/sounds/sfx/coin.wav');
  assets.sounds.hitSound = loadSound('assets/sounds/sfx/hit.wav');

  // Load fonts
  loadFont('assets/fonts/BebasNeue-Regular.ttf').then((font) => {
    document.fonts.add(font);
  });
}

export { assets, loadAssets };