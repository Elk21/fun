const size = 20;

function setup() {
  createCanvas(600, 600);
  background(21);
}

function draw() {
  noLoop();
  stroke(255);
  strokeWeight(2);

  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < width; j += size) {
      if (random(1) > 0.5) line(i, j, i + size, j + size);
      else line(i, j + size, i + size, j);
    }
  }
}