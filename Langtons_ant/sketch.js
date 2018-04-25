let grid;
let ants = [];
let slider;
let movesPerformed = 0;

const CELL_SIZE = 2;
const WIDTH = 600;
const HEIGHT = 600;
const ANTS_COUNT = 5;

function setup() {

  createCanvas(WIDTH, HEIGHT);



  // Slider controls speed
  slider = createSlider(1, 1000, 100, 10);

  grid = new Grid(WIDTH / CELL_SIZE, HEIGHT / CELL_SIZE, CELL_SIZE);

  // Create new ants
  for (let i = 0; i < ANTS_COUNT; i++) {
    ants.push(new Ant(grid));
  }

  grid.draw();
}

function draw() {

  // Performe moves some amount of times
  for (let n = 0; n < slider.value(); n++) {
    // Move all ants
    for (let i = 0; i < ANTS_COUNT; i++) {
      ants[i].move();
    }
  }

  // Draw all new cells
  grid.drawNew();
}