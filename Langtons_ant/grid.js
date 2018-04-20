class Grid {
    constructor(w, h, size = 1) {
        this.w = w; // width of the grid
        this.h = h; // height
        this.size = size; // size of the cell
        this.changedCells = [];


        // 0 - white color 1 - black color grid[i][j] = grid[i * grid.length + j]
        this.grid = [];

        // Creating 2D array
        for (let i = 0; i < w; i++) {
            let gridJ = [];
            for (let j = 0; j < h; j++) {
                gridJ[j] = 0;
            }
            this.grid[i] = gridJ;
        }
    }

    get(i, j) {
        return this.grid[i][j];
    }

    set(i, j, value) {
        this.grid[i][j] = value;
    }

    // Change color of a cell
    change(i, j, color) {
        if (this.grid[i][j] == 0) {
            this.grid[i][j] = color;
        } else {
            this.grid[i][j] = 0;
        }

        // Add cell to draw array
        this
            .changedCells
            .push([i, j, this.grid[i][j]
            ]);
    }

    // Draw all cells that changed color
    drawNew() {
        push();
        colorMode(HSB, 100);
        // return if nothing changed
        if (!this.changedCells)
            return;

        for (let i = 0; i < this.changedCells.length; i++) {
            let cell = this.changedCells[i];
            let color = cell[2];

            if (color == 0) {
                fill(0, 0, 0);
            } else {
                fill(color, 100, 70);
            }

            rect(cell[0] * this.size, cell[1] * this.size, this.size, this.size);
        }
        this.changedCells = [];
        pop();
    }

    // Draw all grid
    draw() {
        noStroke();
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                let cell = this.grid[i][j];

                if (cell == 0) {
                    fill(0);
                } else {
                    fill(255);
                }

                rect(i * this.size, j * this.size, this.size, this.size);
            }
        }
    }
}