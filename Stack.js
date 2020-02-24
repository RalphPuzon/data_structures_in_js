class Node {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}

//head, tail and length are usually reserved for l.lists.
//we simply rename shift and unshit to push pop, to keep O(1).

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  //METHODS:
  push(val) { //this is UNSHIFT, WE'RE ADDING IN.
    let newNode = new Node(value);
    if(!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }//end push

  pop() { //this is SHIFT, WE'RE TAKING OUT.
    if(!this.first) return undefined;
    let toBePopped = this.first;
	if(this.first === this.last) {
		this.first = null;
		this.last = null;
	}
    this.first = toBePopped.next;
    this.size--;
    return toBePopped.value;
  }


}//end of stack class