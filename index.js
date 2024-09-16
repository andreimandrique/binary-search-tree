import BinarySearchTree from "./binarySearchTree.js";

//callback
function printNode(data) {
    console.log("Node data:", data);
}

// create a binary search tree
const BST = new BinarySearchTree();

//sample array
const sampleArray = [5, 3, 1, 4, 2];

// build a binary search tree from an unsorted array
BST.buildTree(sampleArray);

BST.display(); // display

console.log(BST.find(3)); // find node 3

console.log(`Is the BST balance ? ${BST.isBalanced()}`); // true

// BST.levelOrder(printNode);
// BST.preOrder(printNode);
// BST.postOrder(printNode);
// BST.inOrder(printNode);

BST.insert(6);
BST.insert(31);
BST.insert(26);
BST.insert(12);

BST.display();

console.log(`Depth ${BST.depth()}`);

console.log(`Is the BST balance ? ${BST.isBalanced()}`); // false

BST.rebalance(); // rebalance the binary tree

BST.display(); // display

BST.delete(5); // try deleting the node 5

console.log(`Height ${BST.height()}`);

BST.display(); // display

// BST.levelOrder(printNode);
// BST.preOrder(printNode);
// BST.postOrder(printNode);
// BST.inOrder(printNode);
