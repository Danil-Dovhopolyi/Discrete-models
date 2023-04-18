const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Введіть назву файлу: ', (filename) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      rl.close();
      return;
    }
    // Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
    const rows = data.trim().split('\n');
    rows.shift(); // видаляю перший рядок
    const arr = rows.map((row) => row.split(' ').map(Number));

    rl.question(
      'Введіть вершину, з якої потрібно шукати найкоротші шляхи: ',
      (source) => {
        source = Number(source);
        let [dist, prev] = dijkstra(arr, source);
        console.log('Distance from source ' + source + ' to each vertex:');
        console.log(dist);
        console.log(
          'Previous vertex in the shortest path from source ' +
            source +
            ' to each vertex:'
        );
        console.log(prev);
        rl.close();
      }
    );
  });
});
/**
 * Функція дейкстри для пошуку найкоротших шляхів у зваженому графі
 * @param {Array} graph - зважений граф у вигляді масиву масивів ребер
 * @param {Number} source - вершина, з якої починається пошук найкоротшого шляху до всіх інших вершин графу
 * @returns {[Array, Array]} - масив з найкоротшими відстанями до кожної вершини та масив з попередніми вершинами на найкоротшому шляху до кожної вершини
 */
function dijkstra(graph, source) {
  let dist = []; // масив найкоротших відстаней від початкової вершини до кожної вершини графу
  let prev = []; // масив попередніх вершин на найкоротшому шляху від початкової вершини до кожної вершини графу
  let Q = new Set(); // множина вершин, які ще не були оброблені
  for (let u = 0; u < graph.length; u++) {
    // для кожної вершини графу
    dist[u] = Infinity; // початкова відстань від початкової вершини - нескінченність
    prev[u] = null; // початкова попередня вершина на шляху від початкової вершини - null
    Q.add(u); // додаємо вершину до множини невідвіданих вершин
  }
  dist[source] = 0; // відстань від початкової вершини до себе ж - 0

  while (Q.size > 0) {
    // доки є невідвідані вершини
    let u = findMin(Q, dist);
    Q.delete(u);
    for (let v = 0; v < graph.length; v++) {
      if (graph[u][v] !== 0 && dist[v] > dist[u] + graph[u][v]) {
        dist[v] = dist[u] + graph[u][v];
        prev[v] = u;
      }
    }
  }

  /**
   * Знаходження вершини з найменшою відстанню серед заданих
   * @param {Set} Q - множина вершин, серед яких треба знайти ту з найменшою відстанню
   * @param {Array} dist - масив найкоротших відстаней від початкової вершини до кожної вершини графу
   * @returns {Number} - вершина з найменшою відстанню серед заданих
   */
  function findMin(Q, dist) {
    let min = Infinity; // мінімальна відстань на початку - нескінченність
    let min_index = null; // індекс вершини з мінімальною відстанню на початку - null
    for (let u of Q) {
      // для кожної вершини, що ще не була оброблена
      if (dist[u] < min) {
        // якщо її відстань менша за мінімальну
        min = dist[u]; // оновлюємо мінімальну відстань
        min_index = u; // оновлюємо індекс вершини з мінімальною відстанню
      }
    }
    return min_index; // повертаємо вершину з мінімальною відстанню
  }

  // повертаємо масиви найкоротших відстаней та попередніх вершин
  return [dist, prev];
}
