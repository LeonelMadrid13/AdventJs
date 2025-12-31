// Script for day21 
function clearGifts(warehouse: string[][], drops: number[]): string[][] {
  if (warehouse.length === 0 || warehouse[0].length === 0) return warehouse;
  
  const board = warehouse.map(row => [...row]);
  const rows = board.length;
  const cols = board[0].length;
  
  for (const drop of drops) {
    if (drop < 0 || drop >= cols) continue;
    
    let placed = false;
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][drop] === '.') {
        board[row][drop] = '#';
        placed = true;
        break;
      }
    }
    
    if (!placed) continue;
    
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row].every(cell => cell === '#')) {
        board.splice(row, 1);
        board.unshift(new Array(cols).fill('.'));
        row++;
      }
    }
  }
  
  return board;
}

console.log('\ntest 1')
console.log(clearGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['#', '.', '#']
  ],
  [1]
))
/*
1. El regalo cae en la columna 1
2. La fila 2 se convierte en [# # #].
3. La fila 2 está completa, el robot la limpia.
6. Se añade una nueva fila vacía en la posición 0.

Resultado:
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
  ]
  */

console.log('\ntest 2')
console.log(clearGifts(
  [
    ['.', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']
  ],
  [0, 1, 2]
))

/*
1. El regalo cae en la columna 0
2. El regalo cae en la columna 1
3. La fila 2 se convierte en [# # #]
4. La fila 2 está completa, el robot la limpia

Por ahora queda así:
[
  ['.', '.', '.']
  ['#', '.', '#'],
  ['#', '.', '#'],
]

5. El regalo cae en la columna 2

Resultado:
[
  ['.', '.', '#'],
  ['#', '.', '#'],
  ['#', '.', '#']
]
*/