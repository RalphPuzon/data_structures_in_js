//PRIORITY QUEUE:

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  //bubbleUp for insert:
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while(idx > 0){ //don't swap with OoRIdx at top
      let parentIdx = Math.floor((idx-1)/2); //where is value falling
      let parent = this.values[parentIdx];
      if(element.priority >= parent.priority) break; //no bubbling up needed anymore
      //else keep swapping
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx  //move idx to where inserting val is now
    }
  }

  //sinkDown for extractMax:
  sinkDown() {
    let idx = 0;
    let element = this.values[0]
    const length = this.values.length;
    while(true) {
      let lcIdx = 2 * idx + 1; //left child index
      let rcIdx = lcIdx + 1; //right child index
      let leftCh, rightCh; //initialize left child and right child with no values, since they're not always going to exist
      let swap = null;

      if(lcIdx < length) leftCh = this.values[lcIdx]; //if index is valid, left child is the value on lcIdx
      if(rcIdx < length) rightCh = this.values[rcIdx]; //if index is valid, right child is the value on rcIdx
	  
	  
      if((leftCh && rightCh) && (this.values[lcIdx] < this.values[idx].priority && this.values[rcIdx].priority < this.values[idx].priority)) {
        let toSwap = this.values.indexOf(Math.min(this.values[lcIdx].priority,this.values[rcIdx].priority))
	  
	  /*the logic above states that if both children exist, and both of the children's priority values are smaller than their parent,  we assign 
	    the index of the smaller of the children into the toSwap variable, which is going to be the new index of element at the bottom*/
        
		//the swapping logic is "a = [b, b=a][0]". do not ask me why this swapping works, but it does. swap vals, correct element's new index, and set swap to True 
        this.values[idx] = [this.values[toSwap], this.values[toSwap] = this.values[idx]][0]; 
        idx = toSwap;
        swap = 1;
      } else if(leftCh && leftCh.priority < element.priority) { //swap case for lc
        this.values[idx] = [this.values[lcIdx],this.values[lcIdx] = this.values[idx]][0];
        idx = lcIdx;
        swap = 1;
      } else if(rightCh && rightCh.priority < element.priority) {//swap case for rc
        this.values[idx] = [this.values[rcIdx],this.values[rcIdx] = this.values[idx]][0];
        idx = rcIdx;
        swap = 1;
      }
      if(swap === null) break;
    }
  }

  enqueue(value, priority) {
    //insert
    let newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }//end insert

  dequeue() {
    let toBeDqd = this.values.shift();
    this.values.unshift(this.values.pop());
    this.sinkDown();
    return toBeDqd;
  }//end MaxBinaryHeap
}
