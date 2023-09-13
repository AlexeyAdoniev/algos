import utils from "node:util";

function Tree(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

Tree.prototype = {
    ...Tree.prototype,
    search(val) {
        if (val === this.val) return this;
        if (val < this.val) {
            if (this.left) {
                return this.left.search(val);
            } else {
                return null;
            }
        } else {
            if (this.right) {
                return this.right.search(val);
            } else {
                return null;
            }
        }
    },
    insert(val) {
        if (val < this.val) {
            if (this.left) {
                return this.left.insert(val);
            } else {
                this.left = new Tree(val);
                return;
            }
        } else {
            if (this.right) {
                return this.right.insert(val);
            } else {
                this.right = new Tree(val);
                return;
            }
        }
    },
    isEqual(tree) {
        let equal_left, equal_right;
        if (this.left) {
            equal_left = tree.left ? this.left.compareTo(tree.left) : false;
        } else {
            equal_left = tree.left ? false : true;
        }

        if (this.right) {
            equal_right = tree.right ? this.right.compareTo(tree.right) : false;
        } else {
            equal_right = tree.right ? false : true;
        }

        return this.val === tree.val && equal_left && equal_right;
    },
    getDepth() {
        const left_depth = this.left ? this.left.getDepth() : 0;
        const right_depth = this.right ? this.right.getDepth() : 0;
        return 1 + Math.max(left_depth, right_depth);
    },
    getSum() {
        const left_sum = this.left ? this.left.getSum() : 0;
        const right_sum = this.right ? this.right.getSum() : 0;
        return this.val + left_sum + right_sum;
    },
    getDiameter() {},
    //depth of left and right differ not more than 1
    isBalanced() {
        function inner(tree) {
            const left_depth = tree.left ? inner(tree.left) : 0;
            const right_depth = tree.right ? inner(tree.right) : 0;

            if (Math.abs(left_depth - right_depth) > 1) {
                throw "unbalanced";
            }

            return 1 + Math.max(left_depth, right_depth);
        }

        try {
            inner(this);
            return true;
        } catch (e) {
            console.log("unbalanced");
            return false;
        }
    },
};

const tree = new Tree(10);
//const tree2 = new Tree(10);
tree.insert(5);
tree.insert(9);
tree.insert(3);
tree.insert(1);
tree.insert(14);
tree.insert(15);
//tree2.insert(5);
//tree2.insert(9);
//tree2.insert(3);
//tree2.insert(1);
//tree2.insert(14);

console.log(tree.isBalanced());
//console.log(utils.inspect(tree, false, 100, true));
