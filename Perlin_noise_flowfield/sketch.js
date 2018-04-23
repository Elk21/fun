// Parameters
let scl = 10; // size of flow vector cell
let offset = 0.1; // Perlin noise offset
let zOffset = 0.002; // controls changings of flowfield over time
let angleMult = 2; // randomness of flowfield vectors
let particlesCount = 1000;

let cols, rows;
let particles = [];
let flowfield;
let zoff = 0;

function setup() {
  createCanvas(1000, 1000);

  cols = floor(width / scl);
  rows = floor(height / scl);

  // Init particles array
  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  flowfield = new Array(rows * cols);
}

function draw() {

  let yoff = 0;
  for (let x = 0; x < cols; x++) {
    let xoff = 0;
    for (let y = 0; y < rows; y++) {
      // Get 3D Perlin noise value and create vector from this value
      let r = noise(xoff, yoff, zoff) * TWO_PI * angleMult;
      let v = p5.Vector.fromAngle(r);
      let index = x + y * cols;
      flowfield[index] = v;

      /*
        Draw flow field vectors
      */
      // push();
      // stroke(0, 50);
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();

      xoff += offset;
    }
    yoff += offset;
  }
  zoff += zOffset;

  // Update all particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].draw();
  }
}