/* 
    Minesweeper
    
    to open cell press "LMB"
    to flag cell press "SPACE"


    TODO:
    1. Create winning solution
    2. Add timer
    3. Create option to generate field of given dimention
*/

const W = 400;
const H = 400;
const cellSize = 40;

let field, mines;
let cols;
let rows;
let minesCount = 0;
let flagsCount = 0;

let div;
let mcText;
let fcText;
let button;

function setup() {
    createCanvas(W + 1, H + 1);

    cols = floor(W / cellSize);
    rows = floor(H / cellSize);
    field = createField();

    div = createDiv("")

    button = createButton("Refresh");
    button.mousePressed(() => refresh());

    mcText = createP("Mines: " + minesCount);
    fcText = createP("Flags: " + flagsCount);

    div.child(mcText);
    div.child(fcText);
    div.child(button);
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            field[i][j].draw();
        }
    }
}

function mousePressed() {
    if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) return;

    let i = floor(mouseX / cellSize);
    let j = floor(mouseY / cellSize);
    field[i][j].reveal();
}

function keyPressed() {
    if (keyCode == 32) {
        if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) return;

        let i = floor(mouseX / cellSize);
        let j = floor(mouseY / cellSize);
        if (field[i][j].flag()) {
            flagsCount++;
        } else if (flagsCount > 0) {
            flagsCount--;
        }
        fcText.html("Flags: " + flagsCount);
    }
}

function createField() {
    let result = []
    for (let i = 0; i < cols; i++) {
        let arr = []
        for (let j = 0; j < rows; j++) {
            arr.push(new Cell(i, j, cellSize));
            if (arr[j].mine) minesCount++;
        }
        result.push(arr);
    }
    return result;
}

function refresh() {
    flagsCount = 0;
    minesCount = 0;

    field = createField();

    mcText.html("Mines: " + minesCount);
    fcText.html("Flags: " + flagsCount);
}
