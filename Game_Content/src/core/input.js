// This file handles user input, including keyboard and gamepad controls.
// It exports functions to check the current state of input devices.

let gamepadConnected = false;
let gamepadIndex = null;
const GAMEPAD_DEADZONE = 0.15; // Deadzone to avoid accidental movement

function checkKeyboardInput() {
    const keys = {
        up: keyIsDown(87) || keyIsDown(UP_ARROW), // W or Up Arrow
        down: keyIsDown(83) || keyIsDown(DOWN_ARROW), // S or Down Arrow
        left: keyIsDown(65) || keyIsDown(LEFT_ARROW), // A or Left Arrow
        right: keyIsDown(68) || keyIsDown(RIGHT_ARROW), // D or Right Arrow
        jump: keyIsDown(32), // Spacebar
        crouch: keyIsDown(16) // Shift
    };
    return keys;
}

function checkGamepadInput() {
    if (!gamepadConnected) return { moveX: 0, moveY: 0, buttons: { jump: false, crouch: false } };

    const gamepads = navigator.getGamepads();
    if (!gamepads || !gamepads[0]) return { moveX: 0, moveY: 0, buttons: { jump: false, crouch: false } };

    const gamepad = gamepads[0];
    
    // Left analog stick axes
    let moveX = gamepad.axes[0] || 0;
    let moveY = gamepad.axes[1] || 0;

    // Apply deadzone
    if (Math.abs(moveX) < GAMEPAD_DEADZONE) moveX = 0;
    if (Math.abs(moveY) < GAMEPAD_DEADZONE) moveY = 0;

    // Check buttons (A=0, B=1, X=2, Y=3 on standard controls)
    const buttons = {
        jump: gamepad.buttons[0]?.pressed || false,
        crouch: gamepad.buttons[2]?.pressed || false
    };

    return { moveX, moveY, buttons };
}

function handleGamepadConnection() {
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
}

export { checkKeyboardInput, checkGamepadInput, handleGamepadConnection };