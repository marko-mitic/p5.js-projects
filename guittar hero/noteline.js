function NoteLine(notes, yPossition) {
  this.visible = true;
  this.notes = [];
  if (notes) {
    this.notes = notes;
  }
  this.yPossition = yPossition ? yPossition : 1;
  this.hitable = true;
}
NoteLine.prototype.update = function() {
  // body...
  //this.yPossition = height ? this.yPossition + 4.5 : 1;
  this.yPossition += 4;
  if (this.yPossition > height + 60) {
    this.yPossition = height + 60;
  }
  for (var i = this.notes.length - 1; i >= 0; i--) {
    this.notes[i].y = this.yPossition;
  }
};
NoteLine.prototype.show = function() {
  // body...
  for (var i = this.notes.length - 1; i >= 0; i--) {
    this.notes[i].show();
  }
};
