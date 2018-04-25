/* 
  Realisation of Floyd–Steinberg dithering algorithm

  https://en.wikipedia.org/wiki/Floyd–Steinberg_dithering

  TODO:
  1. Create menu
  2. Load img from user
*/


let img;
let newImg;

// Number of colors = scl ^ 3
const scl = 2;

function preload() {
  img = loadImage('https://c1.staticflickr.com/1/176/473792114_839a6d66ac_z.jpg?zz=1');
  //img = loadImage('https://pbs.twimg.com/profile_images/435107609767858177/kaPOalZy.jpeg');
  
}

function setup() {
  createCanvas(1000, 500);
  background(51);

  //img.filter(GRAY);
  img.resize(500, 500);

  image(img, 0, 0, img.width, img.height);
  newImg = createImage(img.width, img.height);

  img.loadPixels();
  newImg.loadPixels();

  for (let y = 0; y < img.height * 4 - 4; y += 4) {
    for (let x = 4; x < img.width * 4 - 4; x += 4) {
      let i = index(x, y);

      let oldR = img.pixels[i + 0];
      let oldG = img.pixels[i + 1];
      let oldB = img.pixels[i + 2];
      let oldA = img.pixels[i + 3];

      let newR = round(scl * oldR / 255) * (255 / scl);
      let newG = round(scl * oldG / 255) * (255 / scl);
      let newB = round(scl * oldB / 255) * (255 / scl);

      newImg.pixels[i + 0] = newR;
      newImg.pixels[i + 1] = newG;
      newImg.pixels[i + 2] = newB;
      newImg.pixels[i + 3] = oldA;

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;


      let ii = index(x + 4, y);
      let r = oldR + errR * 7 / 16.0;
      let g = oldG + errG * 7 / 16.0;
      let b = oldB + errB * 7 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x - 4, y + 4);
      r = oldR + errR * 3 / 16.0;
      g = oldG + errG * 3 / 16.0;
      b = oldB + errB * 3 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x, y + 4);
      r = oldR + errR * 5 / 16.0;
      g = oldG + errG * 5 / 16.0;
      b = oldB + errB * 5 / 16.0;
      newImg.pixels[ii + 0] = r;
      newImg.pixels[ii + 1] = g;
      newImg.pixels[ii + 2] = b;
      newImg.pixels[ii + 3] = oldA;

      ii = index(x + 4, y + 4);
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

  image(newImg, img.width, 0, img.width, img.height);
}

function index(x, y) {
  return x + y * img.width;
}