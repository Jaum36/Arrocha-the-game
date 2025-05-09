// This file defines button components used in the UI.
// It includes functions to draw buttons and check for hover and click states.

function drawButton(label, x, y, width, height, colorScheme) {
    fill(colorScheme.primary);
    rect(x - width / 2, y - height / 2, width, height, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(label, x, y);
}

function isMouseOverButton(x, y, width, height) {
    return (
        mouseX > x - width / 2 &&
        mouseX < x + width / 2 &&
        mouseY > y - height / 2 &&
        mouseY < y + height / 2
    );
}

function handleButtonClick(x, y, width, height, callback) {
    if (isMouseOverButton(x, y, width, height) && mouseIsPressed) {
        callback();
    }
}