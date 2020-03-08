//Graphs

class Graph {
  constructor() {
    this.adjList = {};
  } //end constructor

  addVertex(v) {
    if(!this.adjList[v]) {
      this.adjList[v] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjList[v1] = this.adjList[v1].filter(v => v!== v2);
    this.adjList[v2] = this.adjList[v1].filter(v => v!== v1);
  }

  removeVertex(vi) {
    while(this.adjList[vi].length) {
      const adjVtx = this.adjList[vi].pop();
      this.removeEdge(vi, adjVtx);
    }
    delete this.adjList[vi];
  }
  //graph traversal:
  dfsRecursive(start){
        const result = [];
        const visited = {};
        const adjList = this.adjList; //scope issue fix for fxn below
		//the fxn below is formatted as f(x), but f is defined in line:
        (function dfs(vertex){
            if(!vertex) return null;
            visited[vertex] = true; //e.g. visited["A"] == true
            result.push(vertex);
			//below is the scoping issue fixed by adjlist above
            adjList[vertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    return dfs(neighbor)
                }
            });
        })(start);
        return result;
    }

  dfsIterative(start){
    const s = [start];
    const result = [];
    const visited = {};
    let handling;

    visited[start] = true;
    while(s.length){
      handling = s.pop();
      result.push(handling);

      this.adjList[handling].forEach(neighbor => {
          if(!visited[neighbor]) {
            visited[neighbor] = true;
            s.push(neighbor)
          }
        });
      }
    return result;
  }

  bfs(start){
    const queue = [start];
    const result = [];
    const visited = {};
    let handling;

    visited[start] = true;
    while(queue.length){
      handling = queue.shift();
      result.push(handling);

      this.adjList[handling].forEach(neighbor => {
          if(!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor)
          }
        });
      }
    return result;
  }
}

//TEST:
let g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A","B");
g.addEdge("A","C");
g.addEdge("B","D");
g.addEdge("C","E");
g.addEdge("D","E");
g.addEdge("D","F");
g.addEdge("E","F");

console.log(g);
console.log(g.bfs("A"));

