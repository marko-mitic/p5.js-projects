function Note(position, extensionNote) {
    this.position = position;
    this.y = 0;
    this.r = 60;
    this.circle;
    this.extensionNote = extensionNote ? extensionNote : false;
    switch (this.position) {
        case 1:
            this.color = color('green');
            this.x = this.r;
            break;
        case 2:
            this.color = color('red');
            this.x = (this.r * 2.5);
            break;
        case 3:
            this.color = color('yellow');
            this.x = this.r * 4;
            break;
        case 4:
            this.color = color('blue');
            this.x = this.r * 5.5;
            break;
        case 5:
            this.color = color('orange');
            this.x = this.r * 7;
            break;
        default:
            this.color = color('black');
            this.x = this.r
    }
}
Note.prototype.show = function() {
    stroke(255);
    strokeWeight(3);
    fill(this.color);
    this.circle = ellipse(this.x, this.y, this.r);
    noFill();
    ellipse(this.x, this.y, this.r / 2);
};
Note.prototype.hit = function() {
    stroke(0);
    fill(color('silver'));
    rect(this.x, this.y, 50);
    //
}
