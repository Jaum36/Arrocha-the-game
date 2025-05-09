class Coin {
    constructor(x, y) {
        this.x = x; // X position of the coin
        this.y = y; // Y position of the coin
        this.size = 20; // Size of the coin
        this.isCollected = false; // Flag to check if the coin is collected
    }

    update() {
        // Update logic for the coin (if any)
    }

    draw() {
        if (!this.isCollected) {
            fill(255, 215, 0); // Gold color for the coin
            noStroke();
            ellipse(this.x, this.y, this.size, this.size); // Draw the coin
        }
    }

    collect() {
        this.isCollected = true; // Mark the coin as collected
    }
}

export default Coin;