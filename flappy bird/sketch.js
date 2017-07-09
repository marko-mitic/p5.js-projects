var bird;
var pipes = [];
var died;
var scores = [];

function setup() {
    createCanvas(400, 500);
    bird = new Bird();
    pipes.push(new Pipe());
    died = 1;
}

function draw() {
    background(0);

    if (frameCount % 10 === 0) {
        bird.score += 5;
    }
    if (frameCount % 100 === 0) {
        pipes.push(new Pipe());
    }



    for (i = pipes.length - 1; i >= 0; i--) {
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

    bird.update();
    bird.show();
    showScore();
}

var showScore = function() {
    var count = 2;
    if (scores.length > 0) {
        scores.sort(function(a, b) {
            return a - b
        })
        for (i = scores.length - 1; i >= 0; i--) {
            var txt = " " + scores[i];
            fill(0, 120, 255);
            text(scores[i] + "", width - 25, 25 * count);
            count++;
        }
        if (scores.length > 10) {
            scores.splice(0, 1);
        }
    }
}

function keyPressed() {
    if (key = ' ') {
        bird.fly();
    }
}
