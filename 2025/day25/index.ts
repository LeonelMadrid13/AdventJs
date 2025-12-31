// Script for day25 
function execute(code: string): number {
  let value = 0;
  let pointer = 0;
  
  while (pointer < code.length) {
    const instruction = code[pointer];
    
    if (instruction === '>') {
      pointer++;
    } else if (instruction === '+') {
      value++;
      pointer++;
    } else if (instruction === '-') {
      value--;
      pointer++;
    } else if (instruction === '[') {
      if (value === 0) {
        let depth = 1;
        pointer++;
        while (depth > 0) {
          if (code[pointer] === '[') depth++;
          if (code[pointer] === ']') depth--;
          pointer++;
        }
      } else {
        pointer++;
      }
    } else if (instruction === ']') {
      if (value !== 0) {
        let depth = 1;
        pointer--;
        while (depth > 0) {
          if (code[pointer] === ']') depth++;
          if (code[pointer] === '[') depth--;
          pointer--;
        }
        pointer++;
      } else {
        pointer++;
      }
    } else if (instruction === '{') {
      if (value === 0) {
        let depth = 1;
        pointer++;
        while (depth > 0) {
          if (code[pointer] === '{') depth++;
          if (code[pointer] === '}') depth--;
          pointer++;
        }
      } else {
        pointer++;
      }
    } else if (instruction === '}') {
      pointer++;
    } else {
      pointer++;
    }
  }
  
  return value;
}

console.log(execute('+++')) // 3
console.log(execute('+--')) // -1
console.log(execute('>+++[-]')) // 0
console.log(execute('>>>+{++}')) // 3
console.log(execute('+{[-]+}+')) // 2
console.log(execute('{+}{+}{+}')) // 0
console.log(execute('------[+]++')) // 2
console.log(execute('-[++{-}]+{++++}')) // 5