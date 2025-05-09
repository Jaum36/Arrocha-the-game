// This file manages pop-up dialogs in the game. It includes functions to draw pop-ups and handle user interactions.

function drawPopup(message, x, y, width, height) {
    fill(0, 0, 0, 150); // Semi-transparent background
    rect(x, y, width, height, 10); // Draw popup background

    fill(255); // White text
    textAlign(CENTER, CENTER);
    textSize(24);
    text(message, x + width / 2, y + height / 2); // Draw message
}

function isMouseOverPopupButton(buttonX, buttonY, buttonWidth, buttonHeight) {
    return (
        mouseX > buttonX - buttonWidth / 2 &&
        mouseX < buttonX + buttonWidth / 2 &&
        mouseY > buttonY - buttonHeight / 2 &&
        mouseY < buttonY + buttonHeight / 2
    );
}

function handlePopupOption(option) {
    console.log("Option clicked:", option);
    // Handle different popup options here
}