import utils from "node:util";

function Tree(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
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
  //mut
  insert(val) {
    if (val < this.val) {
      if (this.left) {
        return this.left.insert(val);
      } else {
        this.left = new Tree(val);
        this.left.parent = this;
        return;
      }
    } else {
      if (this.right) {
        return this.right.insert(val);
      } else {
        this.right = new Tree(val);
        this.right.parent = this;
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
  getDiameter() {
    let diameter = 0;
    function inner(tree) {
      const left_depth = tree.left ? 1 + inner(tree.left) : 0;
      const right_depth = tree.right ? 1 + inner(tree.right) : 0;

      const sum = left_depth + right_depth;
      if (sum > diameter) {
        diameter = sum;
      }
      return Math.max(left_depth, right_depth);
    }
    inner(this);
    return diameter;
  },
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
  //mut
  invert() {
    const left = this.right ? this.right.invert() : undefined;
    const right = this.left ? this.left.invert() : undefined;
    return new Tree(this.val, left, right);
  },
  printTraveral() {
    if (this.left) this.left.printTraveral();
    console.log(this.val);
    if (this.right) this.right.printTraveral();
  },
  getFarLeft(val) {
    const sub_tree = this.search(val || this.val);
    function inner(sub_tree) {
      return sub_tree.left ? inner(sub_tree.left) : sub_tree.val;
    }
    return inner(sub_tree);
  },
  getSuccessor(val) {
    const sub_tree = this.search(val || this.val);
    function inner(tree) {
      if (tree.right) {
        return tree.right.getFarLeft();
      } else {
        while (1) {
          if (!tree.parent) {
            return undefined;
          }
          if (tree.parent.left?.val === tree.val) {
            return tree.parent.val;
          }
          tree = tree.parent;
        }
      }
    }

    return inner(sub_tree);
  },
};

const tree = new Tree(10);
//const tree2 = new Tree(10);

tree.insert(9);

tree.insert(12);
tree.insert(11);
tree.insert(13);
tree.insert(8);
tree.insert(8.8);
tree.insert(8.9);
tree.insert(7);
tree.insert(9.5);
tree.insert(9.8);

//tree2.insert(5);
//tree2.insert(9);
//tree2.insert(3);
//tree2.insert(1);
//tree2.insert(14);

console.log(tree.getSuccessor(8.9));
//console.log(utils.inspect(tree, false, 100, true));
