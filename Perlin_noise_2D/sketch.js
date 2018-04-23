// Visualisation of 2D Perlin noise


// Perlin noise offset
let offset = 0.02;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  loadPixels();
  let yoff = 0;
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {

      let index = (x + y * width) * 4;
      let r = noise(xoff, yoff) * 255;

      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xoff += offset;
    }
    yoff += offset;
  }
  updatePixels();
}