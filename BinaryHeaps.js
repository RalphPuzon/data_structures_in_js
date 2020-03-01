//BINARY HEAPS:

class MaxBinaryHeap {
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
      if(element <= parent) break; //no bubbling up needed anymore
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
      if((leftCh && rightCh) && (leftCh > this.values[idx] && rightCh > this.values[idx])) {
        let toSwap = this.values.indexOf(Math.max(leftCh,rightCh))
        this.values[idx] = [this.values[toSwap], this.values[toSwap] = this.values[idx]][0];
        idx = this.values.indexOf(element);
        swap = 1;
      } else if(lcIdx && leftCh > element) {
        this.values[idx] = [this.values[lcIdx],this.values[lcIdx] = this.values[idx]][0];
        idx = this.values.indexOf(element);
        swap = 1;
      } else if(rcIdx && rightCh > element) {
        this.values[idx] = [this.values[rcIdx],this.values[rcIdx] = this.values[idx]][0];
        idx = this.values.indexOf(element);
        swap = 1;
      }
      if(swap === null) break;
    }
  }

  insert(value) {
    //insert
    this.values.push(value);
    this.bubbleUp();
  }//end insert

  extractMax() {
    let toBeExtracted = this.values.shift();
    this.values.unshift(this.values.pop());
    this.sinkDown();
    return toBeExtracted;
  }//end MaxBinaryHeap
}