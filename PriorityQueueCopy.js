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
      let lcIdx = 2 * idx + 1;
      let rcIdx = lcIdx + 1;
      let leftCh, rightCh; //init vals, since they're not always going to exist
      let swap = null;

      if(lcIdx < length) leftCh = this.values[lcIdx]; //add vals
      if(rcIdx < length) rightCh = this.values[rcIdx];

      if((leftCh && rightCh) && (this.values[lcIdx] < this.values[idx].priority && this.values[rcIdx].priority < this.values[idx].priority)) {
        let toSwap = this.values.indexOf(Math.min(this.values[lcIdx].priority,this.values[rcIdx].priority))

        console.log(toSwap);
        this.values[idx] = [this.values[toSwap], this.values[toSwap] = this.values[idx]][0];
        idx = this.values.indexOf(element);
        swap = 1;
      } else if(leftCh && leftCh.priority < element.priority) {
        this.values[idx] = [this.values[lcIdx],this.values[lcIdx] = this.values[idx]][0];
        idx = this.values.indexOf(element);
        swap = 1;
      } else if(rightCh && rightCh.priority < element.priority) {
        this.values[idx] = [this.values[rcIdx],this.values[rcIdx] = this.values[idx]][0];
        idx = this.values.indexOf(element);
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

let ER = new PriorityQueue();
ER.enqueue('common cold', 5);
ER.enqueue('gunshot wound', 1);
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

ER.dequeue();