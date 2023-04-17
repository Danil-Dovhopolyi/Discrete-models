const fs = require('fs');

// Зчитуємо дані з файлів
const data1 = fs.readFileSync('adjMatrix1.txt', 'utf8');
const data2 = fs.readFileSync('adjMatrix2.txt', 'utf8');
const data3 = fs.readFileSync('adjMatrix3.txt', 'utf8');

const rows1 = data1.trim().split('\n');
const rows2 = data2.trim().split('\n');
const rows3 = data3.trim().split('\n');
rows1.shift();
rows2.shift();
rows3.shift();
const adjMatrix1 = rows1.map((row) => row.split(' ').map(Number));
const adjMatrix2 = rows2.map((row) => row.split(' ').map(Number));
const adjMatrix3 = rows3.map((row) => row.split(' ').map(Number));

function areGraphsIsomorphic(n, graph1, graph2) {
  // Перевірити чи мають графи однакову кількість вершин та однаковий розмір матриці суміжності
  if (
    n !== graph1.length ||
    n !== graph2.length ||
    graph1[0].length !== graph2[0].length
  ) {
    return false;
  }

  // Масив для збереження індексів відображення вершин
  const vertexMapping = new Array(n).fill(-1);

  // Масив для відстеження відвіданих вершин
  const visitedVertices = new Array(n).fill(false);

  // Рекурсивна функція для знаходження ізоморфізму графів
  function findIsomorphic(currentVertex) {
    // Якщо всі вершини були перевірені, то графи є ізоморфними
    if (currentVertex === n) {
      return true;
    }

    // Перебираємо всі можливі відображення вершин другого графа
    for (let i = 0; i < n; i++) {
      // Перевіряємо чи збігається діагональна елементи матриць і чи не була вже відвідана ця вершина другого графа
      if (
        graph1[currentVertex][currentVertex] !== graph2[i][i] ||
        visitedVertices[i]
      ) {
        continue;
      }

      // Перевіряємо чи збігаються всі зв'язки між вершинами графів, що були перевірені до цього моменту
      let foundIsomorphic = true;
      for (let j = 0; j < currentVertex; j++) {
        // Перевіряємо чи збігаються зв'язки між вершинами
        if (graph1[currentVertex][j] !== graph2[i][vertexMapping[j]]) {
          foundIsomorphic = false;
          break;
        }
      } // Якщо знайдено відображення вершин, то зберігаємо його та продовжуємо перевірку наступної вершини
      if (foundIsomorphic) {
        vertexMapping[currentVertex] = i;
        visitedVertices[i] = true;
        if (findIsomorphic(currentVertex + 1)) {
          return true;
        }
        visitedVertices[i] = false;
      }
    }

    // Якщо не знайдено відображення вершин, то графи не є ізоморфними
    return false;
  }

  // Починаємо перевірку від першої вершини
  return findIsomorphic(0);
}

// console.log(adjMatrix2, '\n', adjMatrix3);
console.log(areGraphsIsomorphic(5, adjMatrix1, adjMatrix3));
