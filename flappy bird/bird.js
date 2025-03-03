/*
Bird Class: Represents the player-controlled bird.
Uses original movement dynamics (gravity 0.8, lift -20, and 0.9 drag) with an added velocity limit.
Resets score to 0 if the bird hits the ground.
*/
function Bird(){
    this.x = 25;
    this.y = height/2;
    this.r = 16;
    this.gravity = 0.8;
    this.lift = -20;
    this.velocity = 0;
    this.score = 0;
    this.maxVelocity = 15; // maximum allowed speed
  
    this.show = function() {
      fill(255);
      ellipse(this.x, this.y, this.r, this.r);
      fill(0, 255, 0);
      text(this.score, width - 25, 30);
    }
  
    this.update = function(){
      this.velocity += this.gravity;
      this.velocity *= 0.9;
      this.velocity = constrain(this.velocity, -this.maxVelocity, this.maxVelocity);
      this.y += this.velocity;
      if(this.y > height - this.r/2){
        this.y = height - this.r/2;
        this.velocity = 0;
        this.score = 0;  // reset score if bird hits the ground
      }
      if(this.y < this.r/2){
        this.y = this.r/2;
        this.velocity = 0;
      }
    }
  
    this.fly = function(){
      this.velocity += this.lift;
    }
  }
  