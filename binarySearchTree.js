import mergeSort from "./mergeSort.js";

function BinarySearchTree() {
    let BST = null;

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    };

    this.display = function () {
        prettyPrint(BST);
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

    this.buildTree = function (arr) {
        if (arr.length == 0) {
            throw "Invalid empty array.";
        }
        if (Array.isArray(arr)) {
            BST = sortedArrayToBST(mergeSort(arr), 0, arr.length - 1);
        } else {
            throw "Array in parameter";
        }
    };

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

    this.insert = function (value) {
        insert(value, BST);
    };

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

    this.delete = function (value) {
        deleteItem(value, BST);
    };

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

    this.find = function (value) {
        return find(value, BST);
    };

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

    this.levelOrder = function (callback) {
        levelOrder(BST, callback);
    };

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

    this.inOrder = function (callback) {
        inOrder(BST, callback);
    };

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

    this.preOrder = function (callback) {
        preOrder(BST, callback);
    };

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

    this.postOrder = function (callback) {
        postOrder(BST, callback);
    };

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

    this.height = function () {
        return height(BST);
    };

    function depth(node) {
        if (node == null) {
            return 0;
        }

        const ldepth = depth(node.left);
        const rdepth = depth(node.right);

        return Math.max(ldepth, rdepth) + 1;
    }

    this.depth = function () {
        return depth(BST);
    };

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

    this.isBalanced = function () {
        return isBalanced(BST);
    };

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

        storeBinaryTree(node);

        const sortedArray = mergeSort(arrayBinaryTree);
        const arrayLength = sortedArray.length;
        const balancedBinaryTree = sortedArrayToBST(
            sortedArray,
            0,
            arrayLength - 1
        );

        return balancedBinaryTree;
    }

    this.rebalance = function () {
        let bl = rebalance(BST);
        BST = null;
        BST = bl;
    };
}

export default BinarySearchTree;
