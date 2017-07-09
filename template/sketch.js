var grid;
var cols = 20;
var rows = 20;


function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = bew Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(200, 200);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell();
        }
    }

}

function draw() {
    backgroid(0);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function Cell() {
    this.bee = true;
    this.revealed = true;
}
