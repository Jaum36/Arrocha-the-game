# Arrocha The Game

## Overview
Arrocha The Game is a fun and engaging game where players navigate through various challenges, collect coins, and power-ups while avoiding obstacles. The game features a dynamic user interface and sound effects to enhance the gaming experience.

## Project Structure
The project is organized into several directories and files:

```
arrocha-game
├── src
│   ├── core
│   │   ├── game.js        # Main game loop and logic
│   │   ├── input.js      # User input handling
│   │   └── sound.js      # Sound management
│   ├── entities
│   │   ├── player.js     # Player character definition
│   │   ├── laser.js      # Laser projectile definition
│   │   ├── coin.js       # Collectible coin definition
│   │   └── powerup.js    # Power-up item definition
│   ├── ui
│   │   ├── menu.js       # Main menu UI
│   │   ├── options.js    # Options menu UI
│   │   ├── buttons.js     # Button components
│   │   └── popup.js      # Pop-up dialogs management
│   ├── utils
│   │   ├── colors.js     # Color utility functions
│   │   └── constants.js   # Game constants
│   ├── assets.js         # Asset loading and management
│   ├── config.js         # Game configuration settings
│   └── sketch.js         # Entry point for the game
├── assets
│   ├── fonts             # Font files
│   ├── sounds            # Sound files
│   └── sprites           # Image files for sprites
├── index.html            # Main HTML file
└── README.md             # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open `index.html` in a web browser to start the game.

## Features
- Dynamic game loop with smooth rendering.
- User input handling for keyboard and gamepad.
- Sound effects and background music.
- Collectible items and power-ups.
- Interactive user interface with menus and options.

## License
This project is licensed under the MIT License.