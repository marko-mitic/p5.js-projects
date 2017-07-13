function Song(noteLines) {
  this.width = 500;
  this.height = 0;
  this.noteLines = noteLines ? noteLines : [];
  this.tact = 1;
}
Song.prototype.show = function() {
  for (var i = 0; i < this.noteLines.length; i++) {
    this.noteLines[i].update();
    this.noteLines[i].show();
  }
};
