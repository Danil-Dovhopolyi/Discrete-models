const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('First.txt', 'utf8');

// Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляю перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));

function TSP_Greedy_Branch_And_Bound(graph) {
  let n = graph.length;
  let visited = Array(n).fill(false);
  let currentPath = Array(n + 1);
  let minPath = Infinity;
  let finalPath = null;

  // Головна функція методу гілок та границь
  function branchAndBound(currentVertex, depth, currentCost, path) {
    // Якщо досягнуто кінця маршруту, перевіряємо чи він коротший за попередні
    if (depth == n) {
      if (graph[currentVertex][0] > 0) {
        let newPathLength = currentCost + graph[currentVertex][0];
        if (newPathLength < minPath) {
          currentPath[n] = 0;
          currentPath[n + 1] = currentPath[0];
          minPath = newPathLength;
          finalPath = [...path, 0];
        }
      }
      return;
    }
    // Перебираємо всі непройдені вершини та розгалужуємо дерево
    for (let i = 0; i < n; i++) {
      if (!visited[i] && graph[currentVertex][i] > 0) {
        visited[i] = true;
        currentPath[depth] = i;
        branchAndBound(i, depth + 1, currentCost + graph[currentVertex][i], [
          ...path,
          i,
        ]);
        visited[i] = false;
      }
    }
  }

  // Починаємо з вершини 0
  visited[0] = true;
  currentPath[0] = 0;
  branchAndBound(0, 1, 0, []);
  console.log('Пройдений маршрут: ', finalPath.join(' -> '));
  return minPath;
}

// Приклад виклику функції з вашою матрицею суміжностей

let minPath = TSP_Greedy_Branch_And_Bound(arr);
console.log('Найкоротший маршрут: ', minPath);
