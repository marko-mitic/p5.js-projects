// ===== Global Variables =====
var symbolSize = 30;
var oldStreams = [];
var newStreams = [];
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var useNewEffect = false;
var effectButton;
var defaultFont;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  // Store the default font (original mode)
  defaultFont = textFont();

  // === ORIGINAL CODE SETUP (UNCHANGED) ===
  textSize(symbolSize);
  var x = 0;
  for (var i = 0; i < width / symbolSize; i++) {
    oldStreams[i] = new Stream(x, round(-500));
    oldStreams[i].generateSymbols();
    x += symbolSize;
  }

  // === NEW CODE SETUP (Enhanced 3D-like mode) ===
  // Do not override the default font here; we'll set it in draw()
  var spacing = symbolSize * 0.8; // tighter spacing for more streams
  var newCount = floor(width / spacing);
  x = 0;
  for (var j = 0; j < newCount; j++) {
    newStreams[j] = new Stream2(x, -500);
    newStreams[j].generateSymbols();
    x += spacing;
  }

  // Create a button to toggle between modes
  effectButton = createButton("Movie Effect: OFF");
  effectButton.position(10, 10);
  effectButton.mousePressed(toggleEffect);
}

function draw() {
  if (useNewEffect) {
    // NEW MODE: set font to monospace for a Matrix feel
    textFont("monospace");
    // Draw a translucent black rectangle for a strong trailing effect
    fill(0, 180);
    rect(0, 0, width, height);
    // Draw the new streams
    for (var i = 0; i < newStreams.length; i++) {
      newStreams[i].draw();
    }
  } else {
    // ORIGINAL MODE: reset to default font and text size
    textFont(defaultFont);
    textSize(symbolSize);
    background(0, 100);
    // Draw the original streams
    for (var i = 0; i < oldStreams.length; i++) {
      oldStreams[i].draw();
    }
  }
}

function toggleEffect() {
  useNewEffect = !useNewEffect;
  effectButton.html(useNewEffect ? "Movie Effect: ON" : "Movie Effect: OFF");
}

/* 
--------------------- ORIGINAL CODE (UNCHANGED) ---------------------
*/
function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.first = first;

  this.setToRandomSymbol = function() {
    this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
  };

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y + this.speed;
  };
}

function Stream(x, y) {
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
  };

  this.draw = function() {
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
  };
}

/* 
--------------------- NEW CODE (Enhanced 3D-like Mode) ---------------------
Each stream in the new mode is given:
  • A random width factor (uniform per stream) that scales the text size.
  • A derived baseSpeed so that wider streams move faster and narrower streams slower.
  • An alpha value mapped from the width factor so that narrower streams are more translucent.
---------------------
*/
function Symbol2(x, y, baseSpeed, first) {
  this.x = x;
  this.y = y;
  this.speed = baseSpeed; // uniform speed for the stream
  this.first = first;
  this.value = "";
  
  this.setToRandomSymbol = function() {
    this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
  };

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y + this.speed;
  };
}

function Stream2(x, y) {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  // Each stream gets a random width factor between 0.6 and 1.4.
  this.widthFactor = random(0.6, 1.4);
  // Map widthFactor to alpha: narrower streams (smaller factor) are more translucent.
  this.alpha = map(this.widthFactor, 0.6, 1.4, 120, 255);
  // Derive baseSpeed from widthFactor: narrower streams move slower, wider faster.
  this.baseSpeed = map(this.widthFactor, 0.6, 1.4, 3, 12);
  this.x = x;
  this.y = y;

  this.generateSymbols = function() {
    var first = (round(random(0, 4)) === 1);
    var yPos = this.y;
    for (var i = 0; i <= this.totalSymbols; i++) {
      var symbol = new Symbol2(this.x, yPos, this.baseSpeed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      yPos -= symbolSize;
      first = false;
    }
  };

  this.draw = function() {
    for (var i = 0; i < this.symbols.length; i++) {
      var symbol = this.symbols[i];
      // Use the stream's widthFactor to adjust text size uniformly.
      textSize(symbolSize * this.widthFactor * (symbol.first ? 1.2 : 1));
      
      if (symbol.first) {
        fill(200, 255, 200, this.alpha);
      } else {
        fill(0, 255, 70, this.alpha);
      }
      
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      
      // Change symbol with a small chance.
      if (random(100) < 5) {
        symbol.setToRandomSymbol();
      }
    }
  };
}
