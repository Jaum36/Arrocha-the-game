// src/utils/constants.js

export const GAME_SETTINGS = {
    INITIAL_PLAYER_HEALTH: 100,
    COIN_SPAWN_RATE: 180, // Frames between coin spawns
    LASER_SPAWN_RATE: 120, // Frames between laser spawns
    HEALTH_SPAWN_RATE: 600, // Frames between health spawns
    INVINCIBILITY_DURATION: 600, // 10 seconds (60fps * 10)
    INVINCIBILITY_SPAWN_RATE: 900, // 15 seconds between spawns
    LASER_DAMAGE: 10,
    COINS_FOR_SPEEDUP: 5,
    SPEED_INCREASE: 0.2, // 20% increase per level
};

export const COLOR_MODES = ["Normal", "Protanopia", "Deuteranopia", "Tritanopia"];

export const POWER_UP_TYPES = {
    HEALTH: 'health',
    INVINCIBILITY: 'invincibility',
    SPEED: 'speed',
};