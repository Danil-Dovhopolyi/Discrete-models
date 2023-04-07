// Підключаємо модуль для роботи з файлами
const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('First.txt', 'utf8');

// Розділяємо текст на рядки, видаляємо перший рядок і створюємо масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляємо перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));

// Функція для знаходження ейлерівого циклу у графі за матрицею суміжності
function eulerianCycle(adjMatrix) {
  let n = adjMatrix.length;
  let stack = [];
  let cycle = [];

  // Знаходимо вершину з ненульовим ступенем
  let currVertex = 0;
  for (let i = 0; i < n; i++) {
    let degree = 0;
    for (let j = 0; j < n; j++) {
      if (adjMatrix[i][j] === 1) {
        degree++;
      }
    }
    if (degree % 2 !== 0) {
      currVertex = i;
      break;
    }
  }

  stack.push(currVertex);

  while (stack.length > 0) {
    let u = stack[stack.length - 1];

    let i;
    for (i = 0; i < n; i++) {
      if (adjMatrix[u][i] === 1) {
        break;
      }
    }

    if (i === n) {
      cycle.push(stack.pop());
    } else {
      adjMatrix[u][i] = 0;
      adjMatrix[i][u] = 0;
      stack.push(i);
    }
  }

  return cycle.reverse();
}

// Вхідна матриця суміжності
const adjMatrix = [
  [0, 1, 0, 1],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 0, 1, 0],
];

// Знаходимо ейлерів цикл та виводимо його у консоль
const eulerCycle = eulerianCycle(adjMatrix);
console.log(eulerCycle);
