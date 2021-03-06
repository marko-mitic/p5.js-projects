function Pipe(){
    this.space = random(80,150);
    this.top = random(50,height/1.5);
    this.bottom = height-this.top-this.space;
    this.x = width;
    this.w = 30;
    this.speed = 2;
    this.highlight = false;
    this.show = function(){
        fill(255);
        if(this.highlight){
            fill(255,0,0);
        }
        rect(this.x,0,this.w,this.top);
        rect(this.x,height-this.bottom,this.w,this.bottom);
    }
    
    this.update = function(){
        this.x -= this.speed;
    }
    
    this.offscreen = function(){
        return (this.x < -this.w);
    }
    
    this.hits = function(bird){
        if(bird.y-bird.r/2 < this.top || bird.y+bird.r/2 > height-this.bottom){
            if (bird.x+bird.r/2 > this.x && bird.x-bird.r/2 < this.x+this.w){
                /*above checks only for a rectangle whose center is at (this.x - bird.r/2,this.y) and a = r.
                we calculate the distance between the centre of the bird and this.x, this.top and this.botom positions
                assuming the circle is not hiting the rectangle. If any of those distances are greater then zero, 
                our assumption is wrong and circle hit the rectangle
                */
                var dx = (this.x - bird.r/2) - bird.x;
                var dyt = bird.y - this.top;
                var dyb = bird.bottom - bird.y;
                if(dx < 0 || dyt < 0 ||  dyb < 0){
                 this.highlight = true;
                 return true;
                }
            }else{
                this.highlight = false;
                
            }
        }
        return false;
    }
}
