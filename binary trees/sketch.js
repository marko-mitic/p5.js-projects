var tree;

function setup() {
    createCanvas(200, 200);
    tree = new Tree();
    var n = new Node(5);
    tree.addNode(n);
    console.log(taree);
}

function Tree() {
    this.root = null;
}

Tree.prototype.addNode = function(n) {
    if (this.root == null) {
        this.root = n;
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

// function draw() {

// }
