/* 
  Realisation of Floyd–Steinberg dithering algorithm
  https://en.wikipedia.org/wiki/Floyd–Steinberg_dithering

  Create image of dots

  TODO:
  2. Load img from user
*/


let IMG;
let newImg;

let colorsSlider;
let imageSizeSlider;

let scl = 1; // Number of colors in image = scl ^ 3
let imgSize = 100;
let grey = false;

function preload() {
  IMG = loadImage('https://c1.staticflickr.com/1/176/473792114_839a6d66ac_z.jpg?zz=1');
}

function setup() {
  createCanvas(1000, 500);
  background(51);

  // Create slider for picking number of colors
  colorsDiv = select('#colorsDiv');
  colorsSlider = createSlider(1, 10, 1, 1);
  colorsDiv.child(colorsSlider);

  // Slider for image size
  imageSizeDiv = select('#imageSizeDiv');
  imageSizeSlider = createSlider(10, 500, 100, 10);
  imageSizeDiv.child(imageSizeSlider);

  select('#checkbox').changed(() => grey = !grey);
}

function draw() {
  background(51);
  scl = colorsSlider.value();
  imgSize = imageSizeSlider.value();
  dither();
}

function dither() {
  // Create new source img
  let img = createImage(imgSize, imgSize);
  img.copy(IMG, 0, 0, IMG.width, IMG.height, 0, 0, imgSize, imgSize)
  img.resize(imgSize, imgSize);

  // Grey scale
  if (grey) img.filter(GRAY);

  image(img, 0, 0, 500, 500);
  newImg = createImage(img.width, img.height);

  img.loadPixels();
  newImg.loadPixels();

  for (let y = 0; y < img.height * 4 - 4; y += 4) {
    for (let x = 4; x < img.width * 4 - 4; x += 4) {
      let i = index(x, y, img.width);

      // Get rgb color of each pixel
      let oldR = img.pixels[i + 0];
      let oldG = img.pixels[i + 1];
      let oldB = img.pixels[i + 2];
      let oldA = img.pixels[i + 3];

      // Calculate new color
      let newR = round(scl * oldR / 255) * (255 / scl);
      let newG = round(scl * oldG / 255) * (255 / scl);
      let newB = round(scl * oldB / 255) * (255 / scl);

      // Set pixel color to new image
      newImg.pixels[i + 0] = newR;
      newImg.pixels[i + 1] = newG;
      newImg.pixels[i + 2] = newB;
      newImg.pixels[i + 3] = oldA;

      // Calculate error
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;


      // Set color to neighbours from left-top to right-bottom
      let ii = index(x + 4, y, img.width);
      let r = oldR + errR * 7 / 16.0;
      let g = oldG + errG * 7 / 16.0;
      let b = oldB + errB * 7 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x - 4, y + 4, img.width);
      r = oldR + errR * 3 / 16.0;
      g = oldG + errG * 3 / 16.0;
      b = oldB + errB * 3 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x, y + 4, img.width);
      r = oldR + errR * 5 / 16.0;
      g = oldG + errG * 5 / 16.0;
      b = oldB + errB * 5 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x + 4, y + 4, img.width);
      r = oldR + errR * 1 / 16.0;
      g = oldG + errG * 1 / 16.0;
      b = oldB + errB * 1 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;
    }
  }

  newImg.updatePixels();
  img.updatePixels();

  image(newImg, 500, 0, 500, 500);
}

// Calculates 1D index from 2D indexes
function index(x, y, w) {
  return x + y * w;
}