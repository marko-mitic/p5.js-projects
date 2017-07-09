var grid;
var cols;
var rows;
var w = 20;
var totalBees = 15;

function mousePressed() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].bee) {
                    gameOver();
                }
            }
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }


}

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(201, 201);
    cols = floor(width / w);
    rows = floor(width / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
    var allSpots = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            allSpots.push([i, j]);
        }
    }
    //bees spots
    for (var n = 0; n < totalBees; n++) {
        var index = floor(random(allSpots.length));
        var choice = allSpots[index];
        var i = choice[0];
        var j = choice[1];
        allSpots.splice(index, 1);
        grid[i][j].bee = true;
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}
