// Script for day17 
function hasFourLights(board: string[][]): boolean {
    const rows = board.length
    const cols = board[0].length
    if (cols < 4 && rows < 4) return false

    const checkSequence = (cells: string[]): boolean => {
        if (cells.length !== 4) return false
        const first = cells[0]
        if (first === '.') return false
        return cells.every((cell) => cell === first)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= cols - 4; j++) {
            const sequence = [
                board[i][j],
                board[i][j + 1],
                board[i][j + 2],
                board[i][j + 3]
            ];
            if (checkSequence(sequence)) return true;
        }
    }

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i <= rows - 4; i++) {
            const sequence = [
                board[i][j],
                board[i + 1][j],
                board[i + 2][j],
                board[i + 3][j]
            ];
            if (checkSequence(sequence)) return true;
        }
    }
    return false
}



const test1 = hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
console.log(test1) // true → hay 4 luces rojas en horizontal
// true → hay 4 luces rojas en horizontal

const test2 = hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
])
console.log(test2)
// true → hay 4 luces verdes en vertical

const test3 = hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
console.log(test3)
// false → no hay 4 luces del mismo color seguidas