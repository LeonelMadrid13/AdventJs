// 🎁 Regalos Sin Vigilancia - Tu enfoque corregido
export function findUnsafeGifts(warehouse: string[]): number {
  if (warehouse.length === 0) return 0;
  
  const rows = warehouse.length;
  const cols = warehouse[0]?.length ?? 0;
  const markedSafe = new Set<string>();
  let unsafeCount = 0;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (warehouse[i][j] === '*') {
        unsafeCount++;
      }
      if (warehouse[i][j] === '#') {
        // Arriba
        if (i > 0 && warehouse[i - 1][j] === '*') {
          const key = `${i - 1},${j}`;
          if (!markedSafe.has(key)) {
            markedSafe.add(key);
            unsafeCount--;
          }
        }
        // Abajo
        if (i < rows - 1 && warehouse[i + 1][j] === '*') {
          const key = `${i + 1},${j}`;
          if (!markedSafe.has(key)) {
            markedSafe.add(key);
            unsafeCount--;
          }
        }
        // Izquierda
        if (j > 0 && warehouse[i][j - 1] === '*') {
          const key = `${i},${j - 1}`;
          if (!markedSafe.has(key)) {
            markedSafe.add(key);
            unsafeCount--;
          }
        }
        // Derecha
        if (j < cols - 1 && warehouse[i][j + 1] === '*') {
          const key = `${i},${j + 1}`;
          if (!markedSafe.has(key)) {
            markedSafe.add(key);
            unsafeCount--;
          }
        }
      }
    }
  }
  
  return unsafeCount;
}