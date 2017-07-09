//variables: A B
// axiom: A
// rules (A → +B−A−B+), (B → −A+B+A−)
var angle;
var axiom = "A";
var sentence = axiom;
var len = 100;
var rules = [];
rules[0] = {
    a: "A",
    b: "+B=A=B+"
}
rules[1] = {
    a: "B",
    b: "=A+B+A="
}


function generate(){
    len *= 0.5;
    var nextSentence = "";
    for(var i = 0; i<sentence.length; i++){
        var current = sentence.charAt(i);
        var found = false;
        for(var j = 0; j <rules.length;j++){
            if(current== rules[j].a){
                found = true;
                nextSentence+= rules[j].b;
                break;
            }
        }
        if(!found){
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    createP(sentence);
    turtle();
}

function turtle(){
    background(51);
   // resetMatrix();
    translate(width/2,height);
    stroke(255,100);
    for(var i = 0; i<sentence.length; i++){
        var current = sentence.charAt(i);
        if(current == "A" || current == "B" ){
            line(0,0,0, -len);
            translate(0,-len);
        }else if (current=="+"){
            rotate(angle);
        }else if (current=="="){
            
            rotate(-angle*2);
        }
    }
}

function setup() {
    createCanvas(400,400);
    angle = radians(25);
    background(51);
    createP(axiom);
   // turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
}

/*function draw() {
    background(51);
}*/