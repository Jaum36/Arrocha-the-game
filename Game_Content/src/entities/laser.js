// This file defines the Laser class, which represents laser projectiles in the game.
// It includes properties for position, speed, and methods for updating and drawing the laser.

class Laser {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 5;
        this.height = 20;
    }

    update() {
        this.y -= this.speed; // Move the laser upwards
        if (this.y < 0) {
            return true; // Indicate that the laser should be removed
        }
        return false; // Indicate that the laser is still active
    }

    draw(ctx) {
        ctx.fillStyle = 'red'; // Laser color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Laser;