// Script for day18 
// 🎄 Panel de Luces Navideñas - Versión Optimizada

function hasFourInARow(board: string[][]): boolean {
  if (board.length === 0 || board[0].length === 0) return false;
  
  const rows = board.length;
  const cols = board[0].length;
  
  // Función auxiliar: verifica si hay 4 luces iguales consecutivas
  const checkSequence = (cells: string[]): boolean => {
    const first = cells[0];
    return first !== '.' && cells.every(cell => cell === first);
  };
  
  // Función auxiliar: extrae secuencia en una dirección específica
  const getSequence = (
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number
  ): string[] => {
    return [
      board[startRow][startCol],
      board[startRow + deltaRow][startCol + deltaCol],
      board[startRow + 2 * deltaRow][startCol + 2 * deltaCol],
      board[startRow + 3 * deltaRow][startCol + 3 * deltaCol]
    ];
  };
  
  // Buscar en ambas direcciones con un solo bucle
  const directions = [
    { deltaRow: 0, deltaCol: 1, maxRow: rows, maxCol: cols - 3 },      // Horizontal
    { deltaRow: 1, deltaCol: 0, maxRow: rows - 3, maxCol: cols },
    { deltaRow: 1, deltaCol: 1, maxRow: rows - 3, maxCol: cols - 3 },
    { deltaRow: 1, deltaCol: -1, maxRow: rows - 3, maxCol: 4 }      // Vertical
  ];
  
  for (const { deltaRow, deltaCol, maxRow, maxCol } of directions) {
    for (let row = 0; row < maxRow; row++) {
      for (let col = 0; col < maxCol; col++) {
        const sequence = getSequence(row, col, deltaRow, deltaCol);
        if (checkSequence(sequence)) return true;
      }
    }
  }
  
  return false;
}

const test1 = hasFourInARow([
  ['R', '.', '.', '.'],
  ['.', 'R', '.', '.'],
  ['.', '.', 'R', '.'],
  ['.', '.', '.', 'R']
])
console.log(test1);
// true → hay 4 luces rojas en diagonal ↘

const test2 = hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['G', '.', '.', '.']
])
console.log(test2);
// true → hay 4 luces verdes en diagonal ↙

const test3 = hasFourInARow([
  ['R', 'R', 'R', 'R'],
  ['G', 'G', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
])
console.log(test3);
// true → hay 4 luces rojas en horizontal

const test4 = hasFourInARow([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
console.log(test4);
// false → no hay 4 luces del mismo color seguidas