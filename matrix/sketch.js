var symbolSize = 30;
var streams = [];
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    textSize(symbolSize);
    var x = 0;
    for (var i = 0; i < width / symbolSize; i++) {
        streams[i] = new Stream(x, round(round(-500, 0)));
        streams[i].generateSymbols();
        x += symbolSize;
    }
}

function draw() {
    background(0, 100);
    for (var i = 0; i < streams.length; i++) {
        streams[i].draw();
    }
}

function Symbol(x, y, speed, first) {
    // body...
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first;
    this.setToRandomSymbol = function() {
        // body...
        this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }
    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream(x, y) {
    // body...
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 10);
    this.x = x;
    this.y = y;
    this.generateSymbols = function() {
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            this.symbols[i] = new Symbol(this.x, this.y, this.speed, first);
            this.symbols[i].setToRandomSymbol();
            this.y -= symbolSize;
            first = false;
        }
    }
    this.draw = function() {
        // body...
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(150, 255, 150);
            } else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            if (random(100) < random(1, 10)) {
                symbol.setToRandomSymbol();
            }
        });
    }
}