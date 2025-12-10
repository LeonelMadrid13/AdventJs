// Script for day10 
function maxDepth (s: string): number {
  let currentDepth = 0;
  let maxDepthFound = 0;
  
  for (const char of s) {
    if (char === '[') {
      currentDepth++;
      maxDepthFound = Math.max(maxDepthFound, currentDepth);
    } else if (char === ']') {
      currentDepth--;
      if (currentDepth < 0) return -1;
    }
  }
  
  return currentDepth === 0 ? maxDepthFound : -1;
}

console.log(maxDepth('[]')) // -> 1
console.log(maxDepth('[[]]')) // -> 2
console.log(maxDepth('[][]')) // -> 1
console.log(maxDepth('[[][]]')) // -> 2
console.log(maxDepth('[[[]]]')) // -> 3
console.log(maxDepth('[][[]][]')) // -> 2

console.log(maxDepth('][')) // -> -1 (cierra antes de abrir)
console.log(maxDepth('[[[')) // -> -1 (faltan cierres)
console.log(maxDepth('[]]]')) // -> -1 (sobran cierres)
console.log(maxDepth('[][][')) // -> -1 (queda uno sin cerrar)