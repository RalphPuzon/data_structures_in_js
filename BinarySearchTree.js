//binary search trees
//2 objects : tree and node:

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}//end Node

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  //methods: insert and find
  insert(value) {

    let toBeInserted = new Node(value);
    if(!this.root) {
      this.root = toBeInserted;
      return this;
	}
	  
	if(toBeInserted.value === this.root.value) {
		console.log("Cannot insert node with equal value to another node already in tree")
        return undefined;
	}
	 
    let nodeOfReference = this.root;

    while(true){
      if(value > nodeOfReference.value) {

        if(nodeOfReference.right === null) {
          nodeOfReference.right = toBeInserted;
          return this;
        } else {
          nodeOfReference = nodeOfReference.right;
        }

      } else if (value < nodeOfReference.value) {
        if(nodeOfReference.left === null) {
          nodeOfReference.left = toBeInserted;
          return this;
        } else {
          nodeOfReference = nodeOfReference.left;
        }
      } 
    }
  }

  find(value) {
    if(!this.root) {
      console.log("tree is empty, nothing search through!");
      return false;
    }
    let nodeOfReference = this.root, found = false;
    while(nodeOfReference && !found) {
      if(value === nodeOfReference.value) {
        found = true;
        return found, nodeOfReference;
      }
      if(value < nodeOfReference.value){
        if(nodeOfReference.left != null){
          nodeOfReference = nodeOfReference.left;
        } else {
          return undefined;
        }
      } else {
        if (nodeOfReference.right != null) {
          nodeOfReference = nodeOfReference.right;
        } else {
          return undefined;
        }
      }
    }
  }
  
  breadthFirstSearch() {

    if(!this.root) return [];

    let toVisit = [this.root],
        visited = [];

    while(toVisit.length > 0) {

      let currentNode = toVisit.shift();
      visited.push(currentNode.value);

      if(currentNode.left) {
        toVisit.push(currentNode.left);
      }
      if(currentNode.right) {
        toVisit.push(currentNode.right);
	  }
	}
  return visited;
  }
  
  DFSPreOrder() {
    let visited = [];
    function traverse(node) {
      visited.push(node.value);
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
    } 
    traverse(this.root);
    return visited;
  }

  DFSPostOrder() {
    let visited = [];
    function traverse(node) {
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
      visited.push(node.value);
    } 
    traverse(this.root);
    return visited;
  }

  DFSInOrder() {
    let visited = [];
    function traverse(node) {
      if(node.left) traverse(node.left);
      visited.push(node.value);
      if(node.right) traverse(node.right);
    } 
    traverse(this.root);
    return visited;
  }
}//end BinarySearchTree

//test:

let tree = new BinarySearchTree();

tree.insert(10)
tree.insert(5)
tree.insert(13)
tree.insert(2)
tree.insert(7)
tree.insert(11)
tree.insert(16)
tree.find(10)


/* ITERATIVE REFACTORED:

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  //methods: insert and find
  insert(value) {

    let toBeInserted = new Node(value);
    if(!this.root) {
      this.root = toBeInserted;
      this.size++;
      return this;
	}
	  
	if(toBeInserted.value === this.root.value) {
		console.log("Cannot insert node with equal value to another node already in tree")
        return undefined;
	}
	
    let nodeOfReference = this.root;
	
    while(true){
      if(value > nodeOfReference.value) {
        if(nodeOfReference.right === null) {
          nodeOfReference.right = toBeInserted;
          this.size++;
          return this;
        }
		
        nodeOfReference = nodeOfReference.right;

      } else {
        if(nodeOfReference.left === null) {
          nodeOfReference.left = toBeInserted;
          this.size++;
          return this;
        }
        nodeOfReference = nodeOfReference.left;
      } 
    }
  }

  find() {

  }
}//end BinarySearchTree


*/