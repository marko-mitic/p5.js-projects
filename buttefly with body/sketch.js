var yoff = 0;
var r = 0;
var g = 0;
var b = 0;
var t = 2;

function setup() {
    createCanvas(200, 200);

   
}

function draw() {
	background(51);
    translate(width / 2, height / 2);
    rotate(PI/2);
    var r = 100;
    stroke(r,g,b);
    strokeWeight(1);
    fill(r,g,b);
    var da = PI / 100;
    var dx = 0.1;
    var xoff = 0;
    ellipse(0,0,10,100)
    beginShape()


    for (var a = -PI / 2; a <= PI / 2; a += da) {
        var n = noise(xoff,yoff);
        var r = sin(t*a) *map(n, 0, 1, 50, 125);
        var x = sin(yoff) * r * cos(a);
        var y = r * sin(a);
        xoff += dx;
        vertex(x, y);
    }
    
    

    
    for (var a = PI / 2; a <= 3 * PI / 2; a += da) {
        var n = noise(xoff,yoff);
        var r = sin(t*a)* map(n, 0, 1, 50, 125);
        var x = sin(yoff) * r * cos(a);
        var y = r * sin(a);
        xoff -= 0.1;
        vertex(x, y);
    }
    endShape();


    yoff += 0.1;
    if(random(1)<0.1){
    	changeColors();
    }
}

var changeColors = function () {
	// body...
	r = round(random(0,255));
	g = round(random(0,255));
	b = round(random(0,255));

}