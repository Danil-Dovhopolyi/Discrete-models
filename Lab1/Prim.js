const fs = require('fs');

// Зчитуємо дані з файлу
const data = fs.readFileSync('Lab1/Third.txt', 'utf8');

// Розділяю текст на рядки, видаляю перший рядок і створюю масив масивів рядків
const rows = data.trim().split('\n');
rows.shift(); // видаляю перший рядок
const arr = rows.map((row) => row.split(' ').map(Number));
const MAX = 'max';
const MIN = 'min';

function primMST(graph, type) {
  const V = graph.length;
  let parent = new Array(V);
  let key = new Array(V);
  let mstSet = new Array(V);

  // Ініціалізуємо всі ключі як найбільші або найменші можливі значення
  let initValue =
    type === MAX ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < V; i++) {
    key[i] = initValue;
    mstSet[i] = false;
  }

  // Перший вузол завжди є коренем
  key[0] = 0;
  parent[0] = -1;

  for (let count = 0; count < V - 1; count++) {
    // Знаходимо вузол з найбільшим або найменшим ключем
    let u = type === MAX ? maxKey(key, mstSet) : minKey(key, mstSet);

    // Додаємо цей вузол до MST
    mstSet[u] = true;

    // Оновлюємо ключі для всіх сусідів вузла з найбільшим або найменшим ключем
    for (let v = 0; v < V; v++) {
      if (
        graph[u][v] &&
        !mstSet[v] &&
        (type === MAX ? graph[u][v] > key[v] : graph[u][v] < key[v])
      ) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }

  printMST(parent, graph);
}

function maxKey(key, mstSet) {
  let max = Number.MIN_SAFE_INTEGER;
  let maxIndex = -1;

  for (let i = 0; i < key.length; i++) {
    if (!mstSet[i] && key[i] > max) {
      max = key[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}

function minKey(key, mstSet) {
  let min = Number.MAX_SAFE_INTEGER;
  let minIndex = -1;

  for (let i = 0; i < key.length; i++) {
    if (!mstSet[i] && key[i] < min) {
      min = key[i];
      minIndex = i;
    }
  }

  return minIndex;
}

function printMST(parent, graph) {
  console.log('Ребра Вага');
  for (let i = 1; i < graph.length; i++) {
    console.log(parent[i] + ' - ' + i + '\t' + graph[i][parent[i]]);
  }
}

primMST(arr, MAX);
