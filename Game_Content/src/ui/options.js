// This file manages the options menu UI. It includes functions to draw options and handle user input for changing settings.

function drawOptions() {
    const currentScheme = colorSchemes[colorMode];

    // Title
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(currentScheme.primary);
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

    // Back button
    drawButton("Voltar", width / 2, height - 100, currentScheme);
}