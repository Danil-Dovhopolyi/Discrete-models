const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('RGR/Data3.txt', 'utf8');

// Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляю перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));

function dijkstra(graph, source) {
  let dist = [];
  let prev = [];
  let Q = new Set();
  for (let u = 0; u < graph.length; u++) {
    dist[u] = Infinity;
    prev[u] = null;
    Q.add(u);
  }
  dist[source] = 0;
  while (Q.size > 0) {
    let u = findMin(Q, dist);
    Q.delete(u);
    for (let v = 0; v < graph.length; v++) {
      if (graph[u][v] !== 0 && dist[v] > dist[u] + graph[u][v]) {
        dist[v] = dist[u] + graph[u][v];
        prev[v] = u;
      }
    }
  }
  return [dist, prev];
}

function findMin(Q, dist) {
  let min = Infinity;
  let min_index = null;
  for (let u of Q) {
    if (dist[u] < min) {
      min = dist[u];
      min_index = u;
    }
  }
  return min_index;
}

const source = 0;
let [dist, prev] = dijkstra(arr, source);
console.log('Distance from source ' + source + ' to each vertex:');
console.log(dist);
console.log(
  'Previous vertex in the shortest path from source ' +
    source +
    ' to each vertex:'
);
console.log(prev);
