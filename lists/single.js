import utils from "node:util";

function ListNode(val, next, is_head) {
  this.val = val;
  if (next) {
    this.next = next;
  } else {
  }
}

Object.assign(ListNode.prototype, {
  push(val) {
    let current = this;
    while (current.next) {
      current = current.next;
    }

    current.next = new ListNode(val);
  },
  pop() {
    let current = this;
    if (!current.next) return current;

    while (current.next) {
      if (!current.next.next) {
        const next = current.next;
        current.next = null;

        return next;
      }

      current = current.next;
    }
  },
  print() {
    let current = this;
    while (current.next) {
      console.log(current.val, " -> ");
      current = current.next;
    }

    console.log(current.val, " -> ");
  },
  reverse() {
    if (!this.next) return this;
    const reversed = this.pop();

    while (this.next) {
      reversed.push(this.pop().val);
    }

    reversed.push(this.val);
    return reversed;
  },
});

const list = new ListNode(1, null, true);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
//const last = list.pop();
//console.log(last, "last");
const reversed = list.reverse();
console.log(utils.inspect(reversed, false, 100, true));
