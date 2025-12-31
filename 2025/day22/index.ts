function canEscape(maze: string[][]): boolean {
  if (maze.length === 0 || maze[0].length === 0) return false;
  
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Función interna más simple
  const findStart = () => {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (maze[r][c] === 'S') return [r, c];
    return null;
  };
  
  // Función de validación que retorna boolean directo
  const isValid = (r: number, c: number, v: boolean[][]) =>
    r >= 0 && r < rows && c >= 0 && c < cols && !v[r][c] && maze[r][c] !== '#';
  
  const start = findStart();
  if (!start) return false;
  
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [start];
  visited[start[0]][start[1]] = true;
  
  let i = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  while (i < queue.length) {
    const [r, c] = queue[i++];
    if (maze[r][c] === 'E') return true;
    
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (isValid(nr, nc, visited)) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }
  
  return false;
}


console.log(canEscape([
  ['S', '.', '#', '.'],
  ['#', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['#', '#', '#', 'E']
]))
// → true

console.log(canEscape([
  ['S', '#', '#'],
  ['.', '#', '.'],
  ['.', '#', 'E']
]))
// → false

console.log(canEscape([['S', 'E']]))
// → true

console.log(canEscape([
  ['S', '.', '.', '.', '.'],
  ['#', '#', '#', '#', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '#', '#', '#', '#'],
  ['.', '.', '.', '.', 'E']
]))
// → true

console.log(canEscape([
  ['S', '.', '.'],
  ['.', '.', '.'],
  ['#', '#', '#'],
  ['.', '.', 'E']
]))
// → false