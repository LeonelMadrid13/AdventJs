export type Board = string;
export type Moves = string;
export type Result = "fail" | "crash" | "success";

export function moveReno(board: Board, moves: Moves): Result {
  const boardArr = board.split("\n").filter(row => row.length > 0);
  
  // Encontrar posición del reno
  let renoPosition: { x: number; y: number } | null = null;
  for (let y = 0; y < boardArr.length; y++) {
    const x = boardArr[y].indexOf("@");
    if (x !== -1) {
      renoPosition = { x, y };
      break;
    }
  }
  
  if (!renoPosition) return "fail";
  
  const boardHeight = boardArr.length;
  const boardWidth = boardArr[0]?.length ?? 0;
  
  // Mapa de movimientos
  const movements: Record<string, { dx: number; dy: number }> = {
    'U': { dx: 0, dy: -1 },
    'D': { dx: 0, dy: 1 },
    'L': { dx: -1, dy: 0 },
    'R': { dx: 1, dy: 0 }
  };
  
  // Procesar cada movimiento
  for (const move of moves) {
    const delta = movements[move];
    if (!delta) return "fail";
    
    renoPosition.x += delta.dx;
    renoPosition.y += delta.dy;
    
    // Verificar límites
    const outOfBounds = renoPosition.x < 0 || 
                        renoPosition.x >= boardWidth || 
                        renoPosition.y < 0 || 
                        renoPosition.y >= boardHeight;
    
    if (outOfBounds) return "crash";
    
    // Obtener celda
    const cell = boardArr[renoPosition.y]?.[renoPosition.x] ?? '';
    
    // Evaluar celda
    if (cell === '#') return "crash";
    if (cell === '*') return "success";
  }
  
  return "fail";
}

const board = `
.....
.*#.*
.@...
.....
`;

console.log("Prueba 1 (D):", moveReno(board, 'D'));
// ➞ 'fail' -> se mueve pero no recoge nada

console.log("Prueba 2 (U):", moveReno(board, 'U'));
// ➞ 'success' -> recoge algo (*) justo encima

console.log("Prueba 3 (RU):", moveReno(board, 'RU'));
// ➞ 'crash' -> choca contra un obstáculo (#)

console.log("Prueba 4 (RRRUU):", moveReno(board, 'RRRUU'));
// ➞ 'success' -> recoge algo (*)

console.log("Prueba 5 (DD):", moveReno(board, 'DD'));
// ➞ 'crash' -> se choca con la parte de abajo del tablero

console.log("Prueba 6 (UUU):", moveReno(board, 'UUU'));
// ➞ 'success' -> recoge algo del suelo (*) y luego se choca por arriba

console.log("Prueba 7 (RR):", moveReno(board, 'RR'));
// ➞ 'fail' -> se mueve pero no recoge nada