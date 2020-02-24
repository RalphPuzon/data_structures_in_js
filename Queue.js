class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

//to keep O(1), in = push (on end), out = shift(front)

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  //METHODS:
  enqueue(val) { //this is PUSH, WE'RE ADDING IN AT END.
    let newNode = new Node(value);
    if !(this.first) {
      this.first = newNode;
      this.last  = newNode;
    }  else {
      this.last.next = newNode //connect node
      this.last = newNode //move end pointer
    }
    return ++this.size;
  }//end enqueue

  dequeue() { //this is SHIFT, WE'RE TAKING OUT FROM FIRST.
    if(!this.first) return undefined;
    let toBeDqd = this.first;
    if(this.first === this.last) {
      this.first = null;
      this.last = null;
    }
    this.first = toBeDqd.next;
    this.size--;
    return toBeDqd.value;
  }//end dequeue


}//end of stack class