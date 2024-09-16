import mergeSort from "./mergeSort.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function Node(data) {
    (this.data = data), (this.left = null), (this.right = null);
}

function sortedArrayToBST(array, start, end) {
    if (start > end) {
        return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = sortedArrayToBST(array, start, mid - 1);
    node.right = sortedArrayToBST(array, mid + 1, end);

    return node;
}

function insert(value, node) {
    if (node == null) {
        return new Node(value);
    }

    if (node.data == value) {
        return node;
    }

    if (value < node.data) {
        node.left = insert(value, node.left);
    } else if (value > node.data) {
        node.right = insert(value, node.right);
    }

    return node;
}

function getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left != null) {
        current = current.left;
    }
    return current;
}

function deleteItem(value, node) {
    if (node == null) {
        return node;
    }

    if (node.data > value) {
        node.left = deleteItem(value, node.left);
    } else if (node.data < value) {
        node.right = deleteItem(value, node.right);
    } else {
        if (node.left == null) {
            return node.right;
        }

        if (node.right == null) {
            return node.left;
        }

        let succ = getSuccessor(node);
        node.data = succ.data;
        node.right = deleteItem(succ.data, node.right);
    }

    return node;
}

function find(value, node) {
    if (node === null) {
        return null;
    }

    const leftResult = find(value, node.left);
    if (leftResult !== null) {
        return leftResult;
    }

    const rightResult = find(value, node.right);
    if (rightResult !== null) {
        return rightResult;
    }

    if (node.data === value) {
        return node;
    }

    return null;
}

const sampleArray = [1, 2, 3, 4, 5];
const arrayLength = sampleArray.length;
const binarySearchTree = sortedArrayToBST(sampleArray, 0, arrayLength - 1);
prettyPrint(binarySearchTree);

function printNode(data) {
    console.log("Node data:", data);
}

function levelOrder(root, callback) {
    if (root == null) {
        return;
    }

    if (typeof callback !== "function") {
        throw new Error("Must have a callback");
    }

    const queue = [];

    queue.push(root);

    while (queue.length != 0) {
        const node = queue.shift();

        callback(node.data);

        if (node.left != null) {
            queue.push(node.left);
        }

        if (node.right != null) {
            queue.push(node.right);
        }
    }
}

function inOrder(node, callback) {
    if (node == null) {
        return;
    }

    if (typeof callback !== "function") {
        throw new Error("Must have a callback");
    }

    inOrder(node.left, callback);

    callback(node.data);

    inOrder(node.right, callback);
}

function preOrder(node, callback) {
    if (node == null) {
        return;
    }

    if (typeof callback !== "function") {
        throw new Error("Must have a callback");
    }

    callback(node.data);

    inOrder(node.left, callback);

    inOrder(node.right, callback);
}

function postOrder(node, callback) {
    if (node == null) {
        return;
    }

    if (typeof callback !== "function") {
        throw new Error("Must have a callback");
    }

    postOrder(node.left, callback);

    postOrder(node.right, callback);

    callback(node.data);
}

function height(node) {
    if (node == null) {
        return 0;
    } else {
        const lheight = height(node.left);
        const rheight = height(node.right);

        if (lheight > rheight) {
            return lheight + 1;
        } else {
            return rheight + 1;
        }
    }
}

function depth(node) {
    if (node == null) {
        return 0;
    }

    const ldepth = depth(node.left);
    const rdepth = depth(node.right);

    return Math.max(ldepth, rdepth) + 1;
}

function isBalanced(root) {
    if (root == null) {
        return true;
    }

    let lh = height(root.left);
    let rh = height(root.right);

    if (
        Math.abs(lh - rh) <= 1 &&
        isBalanced(root.left) == true &&
        isBalanced(root.right) == true
    ) {
        return true;
    } else {
        return false;
    }
}

function rebalance(node) {
    let arrayBinaryTree = [];

    function storeBinaryTree(node) {
        if (node == null) {
            return;
        }

        storeBinaryTree(node.left);

        storeBinaryTree(node.right);

        arrayBinaryTree.push(node.data);
    }

    storeBinaryTree(root);

    const sortedArray = mergeSort(arrayBinaryTree);
    const arrayLength = sortedArray.length;
    const balancedBinaryTree = sortedArrayToBST(
        sortedArray,
        0,
        arrayLength - 1
    );

    return balancedBinaryTree;
}

// const sampleArray = [1, 2, 3, 4, 5];
// const arrayLength = sampleArray.length;
// const binarySearchTree = sortedArrayToBST(sampleArray, 0, arrayLength - 1);
// prettyPrint(binarySearchTree);

console.log(isBalanced(binarySearchTree)); // true

// inOrder(binarySearchTree, printNode);
// postOrder(binarySearchTree, printNode);
// inOrder(binarySearchTree, printNode);

//create a unbalaced binary tree

let root = new Node(10);
root.right = new Node(3);
root.left = new Node(8);
root.left.left = new Node(7);
root.left.left.left = new Node(6);
root.left.left.left.left = new Node(5);

prettyPrint(root); // unbalanced binary tree

console.log(isBalanced(root)); // false

const BST = rebalance(root);

prettyPrint(BST); // balanced the unbalanced binary search tree

// inOrder(BST, printNode);
// postOrder(BST, printNode);
// inOrder(BST, printNode);

console.log(`Height of the BST ${height(BST)}`);
console.log(`Depth of the BST ${depth(BST)}`);
console.log(find(8, BST));

insert(15, BST); // insert 15 into BST

prettyPrint(BST); // print  BST

deleteItem(8, BST); // delete 8 into BST

prettyPrint(BST); // print BST
