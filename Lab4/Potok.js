const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('Lab4/First.txt', 'utf8');

// Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляю перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));

function maxFlow(graph, source, sink) {
  let maxFlow = 0;
  const residualGraph = graph.map((row) => row.slice());
  const parent = new Array(graph.length).fill(-1);

  function bfs() {
    const visited = new Array(graph.length).fill(false);
    const queue = [];
    queue.push(source);
    visited[source] = true;
    while (queue.length > 0) {
      const u = queue.shift();
      for (let v = 0; v < graph.length; v++) {
        if (!visited[v] && residualGraph[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }
    return visited[sink];
  }

  function dfs(u, minCapacity) {
    if (u == sink) {
      return minCapacity;
    }
    for (let v = 0; v < graph.length; v++) {
      if (residualGraph[u][v] > 0 && parent[v] == -1) {
        parent[v] = u;
        const flow = dfs(v, Math.min(minCapacity, residualGraph[u][v]));
        if (flow > 0) {
          residualGraph[u][v] -= flow;
          residualGraph[v][u] += flow;
          return flow;
        }
      }
    }
    return 0;
  }

  while (bfs()) {
    let pathFlow = Number.MAX_VALUE;
    for (let v = sink; v != source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, residualGraph[u][v]);
    }
    for (let v = sink; v != source; v = parent[v]) {
      const u = parent[v];
      residualGraph[u][v] -= pathFlow;
      residualGraph[v][u] += pathFlow;
    }
    maxFlow += pathFlow;

    // Find an augmenting path using DFS
    while (true) {
      parent.fill(-1);
      const flow = dfs(source, Number.MAX_VALUE);
      if (flow == 0) {
        break;
      }
      maxFlow += flow;

      // Print the augmenting path
      let u = sink;
      const augmentingPath = [u];
      while (u != source) {
        u = parent[u];
        augmentingPath.unshift(u);
      }
      console.log(`Augmenting path: ${augmentingPath.join(' -> ')}`);
    }
  }

  console.log(`Max flow: ${maxFlow}`);
  return maxFlow;
}

maxFlow(arr, 0, 7);
