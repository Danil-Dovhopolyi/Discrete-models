const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('First.txt', 'utf8');

// Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляю перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));
// Вхідна матриця суміжності
const matrix = [
  [0, 0, 69, 60, 10, 20],
  [0, 0, 0, 31, 39, 2],
  [69, 0, 0, 0, 59, 0],
  [60, 31, 0, 0, 0, 36],
  [10, 39, 59, 0, 0, 79],
  [20, 2, 0, 36, 79, 0],
];

// Функція для обчислення найкоротшого шляху та пройденого шляху за допомогою методу динамічного програмування
function tspDynamicProgramming(matrix) {
  const n = matrix.length;
  const memo = new Array(n).fill(null).map(() => new Array(1 << n).fill(null));

  function dp(node, visited) {
    if (visited === (1 << n) - 1) {
      return [matrix[node][0], [node, 0]];
    }

    if (memo[node][visited] !== null) {
      return memo[node][visited];
    }

    let minDistance = Infinity;
    let path = [];
    for (let i = 0; i < n; i++) {
      if ((visited & (1 << i)) === 0 && matrix[node][i] !== 0) {
        const [distance, subPath] = dp(i, visited | (1 << i));
        const totalDistance = matrix[node][i] + distance;
        if (totalDistance < minDistance) {
          minDistance = totalDistance;
          path = [node, ...subPath];
        }
      }
    }

    memo[node][visited] = [minDistance, path];
    return memo[node][visited];
  }

  const [shortestDistance, path] = dp(0, 1);
  const pathString = path.join(' -> ');
  return { shortestDistance, path: pathString };
}

// Виклик функції та виведення результату
const { shortestDistance, path } = tspDynamicProgramming(matrix);
console.log(`Найкоротший шлях: ${shortestDistance}`);
console.log(`Пройдений шлях: ${path}`);
