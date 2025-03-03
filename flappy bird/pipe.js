/*
Pipe Class: Represents an obstacle pipe.
Each pipe has a top and bottom section with a gap in between.
Handles movement, display (with a highlight on collision), and collision detection.
*/
function Pipe(){
    this.space = random(80,150);
    this.top = random(50, height/1.5);
    this.bottom = height - this.top - this.space;
    this.x = width;
    this.w = 30;
    this.speed = 2;
    this.highlight = false;
    
    this.show = function(){
      fill(255);
      if(this.highlight){
        fill(255, 0, 0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
    }
    
    this.update = function(){
      this.x -= this.speed;
    }
    
    this.offscreen = function(){
      return (this.x < -this.w);
    }
    
    this.hits = function(bird) {
      let radius = bird.r / 2;
      let hit = false;
      
      // Check collision with the top pipe rectangle
      let closestX = constrain(bird.x, this.x, this.x + this.w);
      let closestY = constrain(bird.y, 0, this.top);
      let d = dist(bird.x, bird.y, closestX, closestY);
      if (d < radius) {
        hit = true;
      }
      
      // Check collision with the bottom pipe rectangle
      closestX = constrain(bird.x, this.x, this.x + this.w);
      closestY = constrain(bird.y, height - this.bottom, height);
      d = dist(bird.x, bird.y, closestX, closestY);
      if (d < radius) {
        hit = true;
      }
      
      this.highlight = hit;
      return hit;
    }
  }
  