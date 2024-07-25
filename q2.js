const dijkstra = (graph, source) => {
  const distances = {};
  const visited = new Set();
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);

  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[source] = 0;

  pq.enqueue([source, 0]);

  while (!pq.isEmpty()) {
    const [current, currentDistance] = pq.dequeue();

    if (visited.has(current)) continue;
    visited.add(current);

    for (let neighbor in graph[current]) {
      let newDist = currentDistance + graph[current][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue([neighbor, newDist]);
      }
    }
  }

  return distances;
};

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this._heap[0];
  }

  enqueue(value) {
    this._heap.push(value);
    this._siftUp();
    return this.size();
  }

  dequeue() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > 0) {
      this._swap(0, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > 0 && this._greater(node, Math.floor((node - 1) / 2))) {
      this._swap(node, Math.floor((node - 1) / 2));
      node = Math.floor((node - 1) / 2);
    }
  }

  _siftDown() {
    let node = 0;
    while (
      (this._left(node) < this.size() &&
        this._greater(this._left(node), node)) ||
      (this._right(node) < this.size() &&
        this._greater(this._right(node), node))
    ) {
      let maxChild =
        this._right(node) < this.size() &&
        this._greater(this._right(node), this._left(node))
          ? this._right(node)
          : this._left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }

  _left(i) {
    return 2 * i + 1;
  }

  _right(i) {
    return 2 * i + 2;
  }
}

const graph = { 0: { 1: 4, 2: 1 }, 1: { 3: 1 }, 2: { 1: 2, 3: 5 }, 3: {} };
const source = 0;
console.log(dijkstra(graph, source));
