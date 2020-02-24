// singly linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

//BAD WAY OF MAKING THE NEXT NODE DUE TO THE NUMBER OF .NEXT() CALLS:
/*
let first = new Node("Hi");
first.next = new Node("there");
first.next.next = new Node("how");
first.next.next.next = new Node("are");
first.next.next.next.next = new Node("you?")
*/

// BETTER:
// make another class:
class SinglyLinkedList {

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  //this is our first method: push. this adds the next nodes to the l.list:
  push(val) {
    let newNode = new Node(val);
    if(!this.head){        // if this.head is null, not "if this is head".
      this.head = newNode;
      this.tail = newNode; //'this.tail = this.head' also works.
    } else {
      this.tail.next = newNode; //add the new node AFTER current tail
      this.tail = newNode; // reassign tail pointer to newNode
    }
    this.length++;
    return this;
  }

  //second method: pop. remove end node.
  //REMINDER! you do NOT have random access to l.lists!
  pop() {
    if(!this.head) return undefined;
    let current = this.head;
    let newTail = this.head;

    while(current.next) {
      newTail = current;      //newTail lags to get link-1
      current = current.next; //current is null detector
      
    this.tail = newTail;
    this.length--; //account for shortened list
    if(this.length === 0) { // reset an "empty" l.list.
      this.head = null;
      this.tail = null;
      }
    return current;
    }
  }

  //method shift:
  shift() {
    if(!this.head) return undefined; //undefined if no nodes
    let toBeShifted = this.head; // temp holder for prev head
    this.head = toBeShifted.next; //set new head as next Node
    this.length--; //decrement length
    if(this.length === 0) this.tail = null; // for 1 node case
	return toBeShifted; //return shifted node
  }
  

  //method: unshift
  unshift(val) {
	let newNode = new Node(val);
	if(!this.head){ 
	this.head = newNode;
	this.tail = newNode;
	} else {
	  newNode.next = this.head;
	  this.head = newNode;
	}
	this.length++;
	return this;
  }

  //method: get
  get(idx) {
    if(idx < 0 || idx > this.length) {
      return null;
    }
    let getCounter = 0;
    let currentGetNode = this.head;
    while(getCounter < idx+1) {
      currentGetNode = currentGetNode.next;
      getCounter++;
    }
    return currentGetNode;
  } 

  //method: set
  set(val, idx) {
    let currNode = this.get(idx);
    if(currNode) {
      currNode.val = val;
      return true;
    }
    return false;
  }

  //method: insert
  insert(idx, val) {
    if(idx < 0 || idx > this.length) {
      return null;
    }
    if(idx ==this.length) {
      this.push(val);
      return true;
    }
    if(idx === 0) {
      this.unshift(val);
      return true;
    } else {
      let insertingNode = new Node(val);
      let prevNode = this.get(idx-1);
      insertingNode.next = this.get(idx);
      prevNode.next = insertingNode;
      this.length++;
      return true;
    }
  }

  //method: remove:
  remove(idx) {
    if(idx < 0 || idx > this.length) {
      return null;
    }
    if(idx == this.length-1) {
      return this.get(idx).pop();
    }

    if(idx == 0) {
      return this.get(idx).shift();
    } else {
      let nodeToBeReturned = this.get(idx);
      let prevNode = this.get(idx-1);
      prevNode.next = this.get(idx+1);
      this.length--;
      return nodeToBeReturned;
    }
  }

  reverse() {
    let node = this.head; //store old head
    this.head = this.tail;
    this.tail = node;  //switch head and tail
    let next;
    let prev = null;
    for(let i = 0; i < this.length; i++) {
      next = node.next; //save next node
      node.next = prev; //flip the "node" pointer direction 
      prev = node; // shift prev title to it's next node ("node")
      node = next; // shift "node" title to it's next node (next)
    }
    return this.head;
  }

  /*
  //reverse with recursion:
  reverse(head) {
    if(!this.head || !this.head.next) { //this works as a check for (this.length == 0 || this.length == 1)
      return head;
    }
    let tmp = reverse(head.next);       // return to me the reverse of the list that comes after me
    head.next.next = head;              // this is checked by the if statement. work is only to be done when we have one node on the stack.
    head.next = undefined;              // set me as undefined
    return tmp;                         // return the list up.
  }
  */

}//close bracket for class