//Weighted Graphs

//for dijkstra's:
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(value, priority) {
    this.values.push({value, priority});
    this.sort(); //dijkstra's selects next shortest path node
  }
  dequeue() {
    return this.values.shift()
  }
  sort() {
    this.values.sort((a,b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjList = {};
  } //end constructor

  addVertex(v) {
    if(!this.adjList[v]) this.adjList[v] = [];
  }

  addEdge(v1, v2, weight) {
    this.adjList[v1].push({node:v2,weight});
    this.adjList[v2].push({node:v1,weight});
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

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [] //to return at end
    let smallest;

    //build up initial state of all tabulature
    for(let vertex in this.adjList){ // (py:) for elem in list
      if(vertex === start){
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex,Infinity);
      }
      previous[vertex] = null;
    }

    //while we have something to visit:
    while(nodes.values.length){
      smallest = nodes.dequeue().value;
      if(smallest === finish) {
        while(previous[smallest]){
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if(smallest || distances[smallest] !== Infinity){
        for(let neighbor in this.adjList[smallest]){
          //find neighboring node:
          let nextNode = this.adjList[smallest][neighbor];
          //calc new dist to neighboring node as "candidate":
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if(candidate < distances[nextNeighbor]){
            //update new smallest to neighbor
            distances[nextNeighbor] = candidate;
            //update previous - how we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue nextNeighbor in PriorityQueue w/ new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    } //end of while(nodes.values.length)
    return path.concat(smallest).reverse();
  }  
}

//TEST:
let g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A","B", 4);
g.addEdge("A","C", 2);
g.addEdge("B","E", 3);
g.addEdge("C","D", 2);
g.addEdge("C","F", 4);
g.addEdge("D","E", 3);
g.addEdge("D","F", 1);
g.addEdge("E","F", 1);

console.log(g);
console.log(g.dijkstra("A","E"));