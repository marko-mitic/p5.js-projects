/*
Sketch: Main game file.
Sets up the canvas, initializes the bird and pipes, updates game objects,
handles collisions, scoring, input, and includes a demo mode for automatic play.
In demo mode, the autopilot aims for a target within the next pipe's gap at 70%
of the gap height and triggers a lift if the bird is too far below that target.
A cooldown (15 frames) limits how often lifts are triggered.
*/
var bird;
var pipes = [];
var scores = [];
var demoMode = false;
var demoButton;
var lastDemoFly = 0; // frameCount when the bird last flew in demo mode
var demoCooldown = 15; // minimum frames between automatic lifts

function setup() {
  createCanvas(400, 500);
  bird = new Bird();
  pipes.push(new Pipe());
  // Create a button to toggle demo mode (ensure p5.dom is loaded)
  demoButton = createButton("Toggle Demo Mode");
  demoButton.position(10, height + 10);
  demoButton.mousePressed(toggleDemo);
}

function draw() {
  background(0);
  
  // Increase score gradually over time
  if (frameCount % 10 === 0) {
    bird.score += 5;
  }
  
  // Add a new pipe every 100 frames
  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }
  
  // Demo mode logic: automatically trigger lift based on a target position,
  // but limit how often it can fly using a cooldown.
  if (demoMode) {
    let nextPipe = null;
    for (let i = 0; i < pipes.length; i++) {
      if (pipes[i].x + pipes[i].w > bird.x) {
        nextPipe = pipes[i];
        break;
      }
    }
    if (nextPipe) {
      // Set target at 70% of the gap height (closer to the bottom, away from the top)
      let target = nextPipe.top + nextPipe.space * 0.7;
      // If the bird is more than 5 pixels below the target and cooldown has passed, trigger a lift
      if (bird.y > target + 5 && (frameCount - lastDemoFly) > demoCooldown) {
        bird.fly();
        lastDemoFly = frameCount;
      }
    }
  }
  
  // Update and display pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (pipes[i].hits(bird)) {
      if (bird.score >= 10) {
        scores.push(bird.score);
      }
      bird.score = 0;
    }
  }
  
  // Update and display the bird
  bird.update();
  bird.show();
  
  // Display the scoreboard with bright yellow for improved visibility
  showScore();
}

function showScore() {
  var count = 2;
  fill(255, 255, 0);
  text(bird.score, width - 50, 30);
  if (scores.length > 0) {
    scores.sort(function(a, b) {
      return a - b;
    });
    for (let i = scores.length - 1; i >= 0; i--) {
      fill(255, 255, 0);
      text(scores[i], width - 50, 25 * count);
      count++;
    }
    if (scores.length > 10) {
      scores.splice(0, 1);
    }
  }
}

// Any key press will make the bird fly
function keyPressed() {
  bird.fly();
}

// Toggle demo mode on or off
function toggleDemo() {
  demoMode = !demoMode;
  if (demoMode) {
    demoButton.html("Demo Mode: ON");
  } else {
    demoButton.html("Toggle Demo Mode");
  }
}
