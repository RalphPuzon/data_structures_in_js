/*whenever you are maling LLs, you make 2 classes: NOdes and the list
class*/
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }//end of constructor bracket
}//end  of class bracket

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }//end of constructor bracket

  //DoublyLinkedList METHODS:
  push(val) {
    let newNode = new Node(val);
    if(this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.length++;
    return this;
  }//end push

  pop() {
    if(!this.head) return undefined;
    let popTail = this.tail;
    let currNode = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      while(currNode.next) {
        currNode = currNode.next;
      }
      this.tail = currNode.prev;
      this.tail.next = null;
      popTail.prev = null;
    }
    this.length--;
    return popTail;
  }//end pop

  shift() {
    if(!this.head) return undefined;
    let popHead = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
      popHead.next = null;
    }
    this.length--;
    return popHead;
  }//end shift

  unshift(val) {
    let newNode = new Node(val);
    if(this.length === 0) {
      //push(newNode) <--ok, but slow due to redundancy within fxns
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }//end unshift

  get(idx) {
    if(idx < 0 || idx > this.length) return undefined;

    if(idx <= this.length/2) {
      let currNode = this.head;
      let counter = 0;
      while(counter != idx){
        currNode = currNode.next;
        counter++;
      }
    } else {
      let currNode = this.tail;
      let counter = this.length-1;
      while(counter != idx){
        currNode = currNode.prev;
        counter--;
      }
    }
    return currNode;
  }// end get

  set(idx, val) {
    let nodeToBeSet = this.get(idx)
    if(nodeToBeSet != null){
      nodeToBeSet.val = val;
      return true;
    }
    return false;
  }//end set
  
  insert(idx, val) {
    if(idx < 0 || idx > this.length) return false;
    if(idx === 0) return this.unshift(val);
    let newNode = new Node(val);
    let frontNode = this.get(idx);
    let backNode = this.get(idx-1);
    newNode.next = frontNode;
    newNode.prev = backNode;
    frontNode.prev = newNode;
    backNode.next = newNode;
    this.length++;
    return True
  }//end insert

  remove(idx) {
    if(idx < 0 || idx > this.length) return false;
    if(idx === 0) return this.shift();
    if(idx === this.length-1) return this.pop();
    let targetNode = this.get(idx);
    targetNode.prev.next = targetNode.next;
    targetNode.next.prev = targetNode.prev;
    targetNode.next = null;
    targetNode.prev = null;
    this.length--;
    return targetNode;
  }//end remove
  
}//end of class bracket