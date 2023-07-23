class Node {
    constructor(key, left, right) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.tree = this.buildTree(merge(arr));
    }

    buildTree(array, root = array[Math.floor((array.length - 1) / 2)], node = new Node(root)) {
        if (array.length < 1 || array == []) return node = null;
        node.left = this.buildTree(array.slice(0, array.indexOf(root)))
        node.right = this.buildTree(array.slice(array.indexOf(root) + 1, array.length))
        return this.tree = node || null
    }

    insert(value, node = this.tree) {
        if (node == null) return node = new Node(value, null, null)
        if (value == node.key) return node; // prevent dublicated values;
        if (value > node.key) node.right = this.insert(value, node.right);
        else if (value < node.key) node.left = this.insert(value, node.left);
        return node
    }

    delete(value, node) {
        if (node == null) return null;
        else if (value > node.key) node.right = this.delete(value, node.right)
        else if (value < node.key) node.left = this.delete(value, node.left)
        else {
            if (node.left == null && node.right !== null) return node.right;
            else if (node.left == null && node.right == null) return null;
            else if (node.right == null && node.left !== null) return node.left;
            else if (node.right !== null && node.left !== null) {
                let rightBranch = node.right;
                while (rightBranch.left != null) {
                    rightBranch = rightBranch.left;

                }
                node.key = rightBranch.key;
                node.right = this.delete(node.key, node.right)
                return node;
            }
        }

        return this.tree = node // return the modified node
    }


    find(value, node = this.tree) {
        if (node == null) return "not exist";
        if (value == node.key) return node;
        if (value > node.key) return this.find(value, node.right);
        if (value < node.key) return this.find(value, node.left);
    }

    levelOrder() {
        if (this.tree == null) return;
        const queue = [this.tree]
        const level = []

        console.log(queue.length)
        while (queue.length > 0) {
            const result = []

            let queueuLength = queue.length
            for (let i = 0; i < queueuLength; i++) {
                const node = queue.shift()
                if (node.left != null) queue.push(node.left)
                if (node.right != null) queue.push(node.right)
                result.push(node.key)
            }
            level.push(result)
        }
        return level
    }


    preorder(node = this.tree, preorder = []) {
        if (node == null) return;
        preorder.push(node.key)
        this.preorder(node.left, preorder)
        this.preorder(node.right, preorder)
        return preorder
    }

    inOrder(node = this.tree, inorder = []) {
        if (node == null) return;
        this.inOrder(node.left, inorder)
        inorder.push(node.key);
        this.inOrder(node.right, inorder)
        return inorder
    }

    postOrder(node = this.tree, postorder = []) {
        if (node == null) return;
        this.postOrder(node.left, postorder)
        this.postOrder(node.right, postorder)
        postorder.push(node.key)
        return postorder
    }

    height(node) {
        if (node == null) return 0;
        const leftH = this.height(node.left)
        const rightH = this.height(node.right)
        return Math.max(leftH, rightH) + 1;
    }

    depth(node) {
        return this.height(node) - 1
    }

    isBalanced(node = this.tree) {
        if (node == null) return 0;
        const leftH = this.height(node.left) + 1
        const rightH = this.height(node.right) + 1
        console.log(rightH, leftH)
        if (leftH - rightH > 1 || rightH - leftH > 1) {
            return 'not balanced'
        }
        else return "balanced"
    }

    rebalance() {
        let arr = this.inOrder()
        return this.tree = this.buildTree(arr)
    }

}









//sort array
function merge(arr) {
    if (arr.length == 1) return arr;
    if (arr.length > 1) {
        let left = arr.slice(0, arr.length / 2);
        let right = arr.slice(arr.length / 2, arr.length)
        return this.sort(merge(left), merge(right))
    }
}

function sort(left, right) {
    let merged = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) merged.push(right.shift())
        if (left[0] < right[0]) merged.push(left.shift())
        if (left[0] == right[0]) left.shift()
    }
    return merged = [...merged, ...left, ...right]
}



//print the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node == null) {
        return;
    }
    if (node.right != null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
    if (node.left != null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};





let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
prettyPrint(tree.tree)
console.log(tree.levelOrder())
console.log(tree.delete(11, tree.tree))
console.log(tree.delete(9, tree.tree))
console.log(tree.delete(4, tree.tree))
console.log(tree.height(tree.tree))
console.log(tree.depth(tree.tree))
console.log(tree.isBalanced())
tree.rebalance()









