let points = [];
// Perlin noise offset
let offset = 0.01;
let xoff = offset;
let slider;
let text;
let div;

function setup() {
  createCanvas(600, 600);
  background(21);

  // Fill array of points with initial values
  for (let i = 0; i < width - 50; i++) {
    points.push(map(noise(xoff), 0, 1, 0, width));
    xoff += offset;
  }

  // Creating interface 
  div = createDiv("");
  text = createP("Speed: " + offset);
  text.id("text");
  text.style("margin", "2");
  div.child(text);
  slider = createSlider(0.001, 0.03, offset, 0.001);
  div.child(slider);
}

function draw() {
  background(21);

  // Controlls offset
  offset = slider.value();
  text.html("Speed: " + offset);

  // Shift all points to the left
  for (let i = 0; i < width - 51; i++) {
    points[i] = points[i + 1];
  }

  // Add new point at the end of an array
  xoff += offset;
  points[points.length - 1] = map(noise(xoff), 0, 1, 0, width);

  // Draw all points
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(i, points[i]);
  }
  endShape();

  // Draw circle at the end of graph
  fill(255, 0, 0);
  noStroke();
  ellipse(width - 50, points[points.length - 1], 10, 10);
}