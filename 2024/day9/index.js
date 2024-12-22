/**
 * @param {string[]} board - Represent the train situation
 * @param {'U' | 'D' | 'R' | 'L' } mov - Movement direction
 * @returns {'none' | 'crash' | 'eat'}
 */
// function moveTrain(board, mov) {
//     // Code here
    
//     const rows = board.length;
//     const headRow = board.findIndex(row => row.includes('@'));
//     const headCol = board[headRow].indexOf('@');

//     const checkMove = (idx) => {
//         if (idx === '*') return 'eat';
//         if (idx === 'o') return 'crash';
//         if (idx === '·') return 'none';
//     }

//     if (mov === 'U') {
//         // Move up
//         if (headRow - 1 < 0) return 'crash';
//         return checkMove(board[headRow - 1][headCol]);
//     }
//     else if (mov === 'D') {
//         // Move down
//         if (headRow + 1 >= rows) return 'crash';
//         return checkMove(board[headRow + 1][headCol]);
//     }
//     else if (mov === 'L') {
//         // Move left
//         if (headCol - 1 < 0) return 'crash';
//         return checkMove(board[headRow][headCol - 1]);
//     }
//     else if (mov === 'R') {
//         // Move right
//         if (headCol + 1 < 0) return 'crash';
//         return checkMove(board[headRow][headCol + 1]);
//     }
// }

function moveTrain(board, mov) {
    const rows = board.length;
    const headRow = board.findIndex(row => row.includes('@'));
    const headCol = board[headRow].indexOf('@');

    const directions = {
        'U': [-1, 0],  // Up
        'D': [1, 0],   // Down
        'L': [0, -1],  // Left
        'R': [0, 1],   // Right
    };

    const [rowOffset, colOffset] = directions[mov];
    const newRow = headRow + rowOffset;
    const newCol = headCol + colOffset;

    // Check for crashes at the board's edge
    if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= board[newRow].length) {
        return 'crash';
    }

    // Check the new position
    const newCell = board[newRow][newCol];
    if (newCell === '*') return 'eat';
    if (newCell === 'o') return 'crash';
    return 'none';
}

const board = ['·····', '*····', '@····', 'o····', 'o····']

console.log(moveTrain(board, 'U'))
// ➞ 'eat'
// Because the train moves up and finds a magical fruit

console.log(moveTrain(board, 'D'))
// ➞ 'crash'
// The train moves down and the head crashes into itself

console.log(moveTrain(board, 'L'))
// ➞ 'crash'
// The train moves to the left and crashes into the wall

console.log(moveTrain(board, 'R'))
// ➞ 'none'
// The train moves to the right and there is empty space on the right