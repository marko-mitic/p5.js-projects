function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w;
    this.y = j * w;
    this.nCount = 0;
    this.bee = false;
    this.revealed = false;
    this.noNearBee = false;
}



Cell.prototype.show = function() {
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if (this.revealed) {
        stroke(0);
        fill(127);
        if (this.bee) {
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else if (this.nCount != 0) {
            fill(200);
            rect(this.x, this.y, this.w, this.w);

            fill(0);
            text(this.nCount, this.x + this.w * .5, this.y + this.w * .5);
        } else {
            fill(220);
            rect(this.x, this.y, this.w, this.w);
        }
    }

}

Cell.prototype.contains = function(x, y) {
    //returns true if x, y is inside this cell, false otherwise
    return (x > this.x && x < this.x + this.w && y < this.y + this.w && y > this.y);
}

Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.nCount == 0) {
        this.revealConnected();
    }

}


Cell.prototype.countBees = function() {
    if (this.bee) {
        this.nCount = -1;
        return;
    }
    var total = 0;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var index1 = this.i + i;
            var index2 = this.j + j;
            try {
                var b = grid[index1][index2];
                if (b.bee) {
                    total++;

                }
            } catch (error) {

            }


        }
    }
    this.nCount = total;

}

Cell.prototype.revealConnected = function() {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var index1 = this.i + i;
            var index2 = this.j + j;
            if (index1 > -1 && index1 < cols && index2 > -1 && index2 < cols) {
                var b = grid[index1][index2];
                if (!b.bee && !b.revealed) {
                    b.reveal();
                }
            }
        }
    }
}
