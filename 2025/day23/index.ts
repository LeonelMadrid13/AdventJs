// Script for day23 
function minStepsToDeliver(map: string[][]): number {
  if (map.length === 0 || map[0].length === 0) return -1;
  
  const rows = map.length;
  const cols = map[0].length;
  
  let startRow = -1;
  let startCol = -1;
  const giftHouses: Array<[number, number]> = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (map[row][col] === 'S') {
        startRow = row;
        startCol = col;
      } else if (map[row][col] === 'G') {
        giftHouses.push([row, col]);
      }
    }
  }
  
  if (startRow === -1) return -1;
  if (giftHouses.length === 0) return 0;
  
  const distances = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue: Array<[number, number, number]> = [[startRow, startCol, 0]];
  distances[startRow][startCol] = 0;
  
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let queueIndex = 0;
  
  while (queueIndex < queue.length) {
    const [row, col, dist] = queue[queueIndex++];
    
    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        distances[nr][nc] === -1 &&
        map[nr][nc] !== '#'
      ) {
        distances[nr][nc] = dist + 1;
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  
  let totalSteps = 0;
  for (const [gRow, gCol] of giftHouses) {
    if (distances[gRow][gCol] === -1) {
      return -1;
    }
    totalSteps += distances[gRow][gCol];
  }
  
  return totalSteps;
}

console.log(minStepsToDeliver([
  ['S', '.', 'G'],
  ['.', '#', '.'],
  ['G', '.', '.']
]))
// Resultado: 4

/* 
Explicación:
- Distancia mínima de S (0,0) a G (0,2): 2 pasos
- Distancia mínima de S (0,0) a G (2,0): 2 pasos
- Total: 2 + 2 = 4
*/

console.log(minStepsToDeliver([
  ['S', '#', 'G'],
  ['#', '#', '.'],
  ['G', '.', '.']
]))
// Resultado: -1
// (La casa en (0,2) es inalcanzable por los obstáculos)

console.log(minStepsToDeliver([['S', 'G']]))
// Resultado: 1