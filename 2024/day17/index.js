/**
 * @param {boolean[][]} grid
 * @returns {number[][]}
 */
function detectBombs(grid) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
    ];

    const rows = grid.length;
    const cols = grid[0].length;

    // Create a new 2D grid to store the bomb counts
    return grid.map((row, rowIndex) =>
        row.map((_, colIndex) => {
            let bombCount = 0;

            for (const [dRow, dCol] of directions) {
                const newRow = rowIndex + dRow;
                const newCol = colIndex + dCol;

                // Check if the new position is within bounds and contains a bomb
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    bombCount += grid[newRow][newCol] ? 1 : 0;
                }
            }

            return bombCount;
        })
    );
}

const grid1 = [
    [true, false, false],
    [false, true, false],
    [false, false, false]
]

console.log({'detectBombs 1': detectBombs(grid1)})
// [
//   [1, 2, 1],
//   [2, 1, 1],
//   [1, 1, 1]
// ]

const grid2 = [
    [true, false],
    [false, false]
];

console.log({'detectBombs 2': detectBombs(grid2)})
// [
//   [0, 1],
//   [1, 1]
// ]

const grid3 = [
    [true, true],
    [false, false],
    [true, true]
]

console.log({'detectBombs 3': detectBombs(grid3)})
// [
//   [1, 1],
//   [4, 4],
//   [1, 1]
// ]