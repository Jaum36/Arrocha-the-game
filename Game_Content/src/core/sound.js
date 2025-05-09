// This file manages sound effects and background music. 
// It includes functions to load sounds and control their playback.

let sounds = {};

function loadSound(name, path) {
    sounds[name] = loadSound(path);
}

function playSound(name) {
    if (sounds[name]) {
        sounds[name].play();
    }
}

function setVolume(name, volume) {
    if (sounds[name]) {
        sounds[name].setVolume(volume);
    }
}

function stopSound(name) {
    if (sounds[name]) {
        sounds[name].stop();
    }
}

function preloadSounds() {
    loadSound('bgMusic', 'assets/sounds/music/Iframe RESENHA DO ARROCHA 1.0 - J. ESKINE - CALMA VIDA TÁ DE BOA [Q9VAdq223VU].mp3');
    loadSound('jump', 'assets/sounds/sfx/eskine-pulando.mp3');
    loadSound('hit', 'assets/sounds/sfx/eskine-tomando.wav');
    loadSound('coin', 'assets/sounds/sfx/moeda.wav');
    loadSound('health', 'assets/sounds/sfx/health.wav');
}