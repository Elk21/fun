class Cell {
    constructor(x, y, w) {
        this.mine = random(0, 10) > 9;
        this.visible = false;
        this.x = x * w;
        this.y = y * w;
        this.w = w;
        this.flaged = false;
    }

    draw() {
        noFill();
        stroke(0);

        if (this.visible) {
            if (this.mine) {
                // Draw mine
                let r = this.w / 2;
                push();
                fill(255, 0, 0);
                translate(this.x + r, this.y + r);

                strokeWeight(2);
                for (let i = 0; i < 8; i++) {
                    line(0, 0, r - 3, 0);
                    rotate(PI / 4);
                }
                ellipse(0, 0, r, r);
                pop();
            } else {
                // Draw number if it > 0;
                let number = this.number()
                if (number > 0) {
                    push();
                    fill(0);
                    textAlign(CENTER, CENTER);
                    textSize(12);
                    text(number, this.x + this.w / 2, this.y + this.w /2);
                    pop();
                } else {
                    // Blank cell
                    fill(255);
                }
            }
        } else {
            fill(201);
        }
        rect(this.x, this.y, this.w, this.w);

        if (this.flaged) {
            fill(0, 255, 0, 100);
            rect(this.x, this.y, this.w, this.w);
        }
    }

    // Count the number of mines in neighbours
    number() {
        if (this.mine) return -1;

        let number = 0;
        let x = this.x / this.w;
        let y = this.y / this.w;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i > -1 && x + i < field.length && y + j > -1 && y + j < field[0].length) {
                    if (field[x + i][y + j].mine) {
                        number++;
                    }
                }
            }
        }
        return number;
    }

    // Reveal cell
    reveal() {
        if (this.visible || this.flaged) return;
        this.visible = true;

        // Open all field if mine boomed
        if (this.mine) {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    field[i][j].visible = true;
                }
            }
        }

        // Reveal all blank tiles recursively
        if (this.number() == 0) {
            let x = this.x / this.w;
            let y = this.y / this.w;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i > -1 && x + i < field.length && y + j > -1 && y + j < field[0].length) {
                        field[x + i][y + j].reveal();
                    }
                }
            }
        }
    }

    flag() {
        if (this.visible) return;

        this.flaged = !this.flaged;
        return this.flaged;
    }
}