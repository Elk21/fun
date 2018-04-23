class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 3;
        this.prevPos = this.pos.copy();
        this.colorOffset = random(10);
    }

    update() {
        this.prevPos = this.pos.copy();

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges();
        this.vel.limit(this.maxSpeed);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.prevPos = this.pos.copy();
        }
    }

    follow(field) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = field[index];

        this.applyForce(force);
    }

    draw() {
        let color = noise(this.colorOffset);
        color = map(color, 0.2, 0.8, 0, 100);
        push();
        colorMode(HSB, 100);
        stroke(35, 80, color, 10);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        pop();
        this.colorOffset += 0.1;
    }
}