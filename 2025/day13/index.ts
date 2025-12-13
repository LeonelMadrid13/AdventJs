// Script for day13 
type Factory = string[]
type Result = 'completed' | 'broken' | 'loop'
      
function runFactory(factory: Factory): Result {
  if (factory.length === 0 || factory[0].length === 0) return 'broken';
  
  const rows = factory.length;
  const cols = factory[0].length;
  let x = 0;
  let y = 0;
  const visited = new Set<string>();
  
  const directions: Record<string, { dx: number; dy: number }> = {
    '>': { dx: 1, dy: 0 },
    '<': { dx: -1, dy: 0 },
    '^': { dx: 0, dy: -1 },
    'v': { dx: 0, dy: 1 }
  };
  
  while (true) {
    // Verificar si está fuera del tablero
    if (x < 0 || x >= cols || y < 0 || y >= rows) {
      return 'broken';
    }
    
    const cell = factory[y][x];
    
    // Si llega a la salida
    if (cell === '.') {
      return 'completed';
    }
    
    // Verificar si ya visitó esta posición
    const positionKey = `${x},${y}`;
    if (visited.has(positionKey)) {
      return 'loop';
    }
    visited.add(positionKey);
    
    // Moverse según la dirección
    const direction = directions[cell];
    if (!direction) {
      return 'broken';
    }
    
    x += direction.dx;
    y += direction.dy;
  }
}

runFactory([
  '>>.'
]) // 'completed'

runFactory([
  '>>>'
]) // 'broken'

runFactory([
  '>><'
]) // 'loop'

runFactory([
  '>>v',
  '..<'
]) // 'completed'

runFactory([
  '>>v',
  '<<<'
]) // 'broken'

runFactory([
  '>v.',
  '^..'
]) // 'completed'

runFactory([
  'v.',
  '^.'
]) // 'loop'