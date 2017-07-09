var testNoteLine;
var mySong;

function setup() {
    createCanvas(700, 450);
    var note1 = new Note(1);
    var note3 = new Note(2);
    var note4 = new Note(4);
    var note5 = new Note(5);
    var note2 = new Note(3);
    var ar = [note1, note2, note3, note4, note5];
    testNoteLine1 = new NoteLine(ar);
    testnoteline2 = new NoteLine()
    var mSongArray = [testnoteLine, test]
}

function CreateRandomSong() {
    var Song = new Song();
    for (var i = 0; i < 5; i++) {
        let noteLine = new NoteLine(floor(random(1, 5.9)))
    }
}

function draw() {
    background(100);
    testNoteLine.update();
    testNoteLine.show();


}
