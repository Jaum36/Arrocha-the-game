class PowerUp {
    constructor(type, x, y) {
        this.type = type; // Type of power-up (e.g., speed, health)
        this.x = x; // X position
        this.y = y; // Y position
        this.width = 30; // Width of the power-up
        this.height = 30; // Height of the power-up
        this.isActive = true; // Indicates if the power-up is active
    }

    update() {
        // Update logic for the power-up (e.g., movement, expiration)
        if (!this.isActive) {
            // Logic for when the power-up is no longer active
        }
    }

    draw() {
        // Draw the power-up on the canvas
        if (this.isActive) {
            // Drawing logic based on the type of power-up
            fill(255, 215, 0); // Example color for the power-up
            rect(this.x, this.y, this.width, this.height);
        }
    }

    collect() {
        // Logic for collecting the power-up
        this.isActive = false; // Mark the power-up as collected
    }
}