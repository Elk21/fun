class Ant {
  constructor(grid, x = Math.round(random(grid.w)), y = Math.round(random(grid.h)), color = Math.round(random(100))) {
    this.x = x;
    this.y = y;
    this.size = grid.size;
    this.grid = grid;
    this.color = color;

    /*
      Direction:
      0 -> UP
      1 -> RIGHT
      2 -> DOWN
      3 -> LEFT
    */
    this.dir = 0;
  }

  rotateRight() {
    this.dir = (this.dir + 1) % 4;
  }

  rotateLeft() {
    this.dir = (this.dir + 3) % 4;
  }

  move() {
    let cell = grid.get(this.x, this.y);

    // Rotate agent
    if (cell == 0) {
      this.rotateRight();
    } else {
      this.rotateLeft();
    }

    // Change color of the current cell on the grid
    grid.change(this.x, this.y, this.color);

    // Move agent in selected direction
    if (this.dir == 0) {
      this.y--;
    } else if (this.dir == 1) {
      this.x++;
    } else if (this.dir == 2) {
      this.y++;
    } else if (this.dir == 3) {
      this.x--;
    }

    this.checkBorders();
  }

  draw() {
    push();
    noStroke();
    colorMode(HSB, 100);
    fill(this.color, 100, 100);
    rect(this.x * this.size, this.y * this.size, this.size, this.size)
    pop();
  }

  pos() {
    return [this.x, this.y];
  }

  // Move over borders 
  checkBorders() {
    if (this.x < 0) {
      this.x = this.grid.w - 1;
    }
    if (this.y < 0) {
      this.y = this.grid.h - 1;
    }
    if (this.x >= this.grid.w) {
      this.x = 0;
    }
    if (this.y >= this.grid.h) {
      this.y = 0;
    }
  }

}