// Script for day20 
function dropGifts(warehouse: string[][], drops: number[]): string[][] {
  for (const drop of drops) {
    for (let row = warehouse.length - 1; row >= 0; row--) {
      if (warehouse[row][drop] === '.') {
        warehouse[row][drop] = '#'
        break
      }
    }
  }
  return warehouse
}


console.log(dropGifts(
  [
    ['.', '.', '.'],
    ['.', '#', '.'],
    ['#', '#', '.']
  ],
  [0]
))
/*
[
  ['.', '.', '.'],
  ['#', '#', '.'],
  ['#', '#', '.']
]
*/

console.log(dropGifts(
  [
    ['.', '.', '.'],
    ['#', '#', '.'],
    ['#', '#', '#']
  ],
  [0, 2]
))
/*
[
  ['#', '.', '.'],
  ['#', '#', '#'],
  ['#', '#', '#']
]
*/

console.log(dropGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
  ],
  [0, 1, 2]
))
/*
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['#', '#', '#']
]
*/

console.log(dropGifts(
  [
    ['#', '#'],
    ['#', '#']
  ],
  [0, 0]
))
/*
[
  ['#', '#']
  ['#', '#']
]
*/