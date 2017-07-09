function Bird(){
    this.y = height/2;
    this.x = 25;
    this.gravity = 0.8;
    this.velocity = 0;
    this.r = 16;
    this.lift = -20;
    this.score = 0;
    this.show = function() {
        fill(255);
        ellipse(this.x,this.y,this.r,this.r);
        fill(0,255,0);
        text(this.score,width - 25,30);
    }
    
    this.update = function(){
        this.velocity += this.gravity;
        this.velocity*=0.9;
        this.y += this.velocity;
        if(this.y > height-this.r/2){
            this.y = height-this.r/2;
        }
        if(this.y < this.r/2){
            this.y = this.r/2;
        }
        
    }
    
    
    
    this.fly = function(){
        this.velocity += this.lift;
         
    }
}