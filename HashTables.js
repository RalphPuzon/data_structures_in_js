//HashTables:

class HashTable {
  constructor(size=53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length; 
    }
    return total;
  }//end constructor

  set(key, value) {
    let idx = this._hash(key);
    if(!this.keyMap[idx]) {
      this.keyMap[idx] = [];//if there is nothing, make empty array
    }
    this.keyMap[idx].push([key,value]);//push into empty array
  }//end set

  get(key) {
    let idx = this._hash(key);
    if(this.keyMap[idx]) {
      for (let i = 0; i < this.keyMap[idx].length; i++) {
        if(this.keyMap[idx][i][0] === key) {
          return this.keyMap[idx][i];
        }
      }
    } 
    return;
  }//end get

  values() {
    let valsArr = [];
    for (let i = 0; i < this.keyMap[idx].length; i++) {
      if(this.keyMap[i]){
        for(let j = 0; j < this.keyMap[i].length; j++){
          if(!valsArr.includes([i][j][1])){
            valsArr.push(this.keyMap[i][j][1])
          }
        }
      }
    }
    return valsArr;
  }

  keys() {
    let keysArr = [];
    for (let i = 0; i < this.keyMap[idx].length; i++) {
      if(this.keyMap[i]){
        for(let j = 0; j < this.keyMap[i].length; j++){
          if(!keysArr.includes([i][j][0])){ //push only if val no in list
            keysArr.push(this.keyMap[i][j][0])
          }
        }
      }
    }
    return keysArr;
  }

let ht = new HashTable(size=17);
ht.set('maroon','#800000');
ht.set('yellow','#FFFF00');
ht.set('olive','#808000');
ht.set('salmon','#FA8072');
ht.set('lightcoral','#F08080');
ht.set('mediumvioletred','#C71585');
ht.set('plum','#DDA0DD');

console.log(ht)
console.log(ht.get('yellow'))