function decodeSantaPin(code: string): string | null {
  // code here
  const blocks = code.match(/\[([^\]]+)\]/g);
  
  if (!blocks) return null;
  
  const digits: number[] = [];
  let prevDigit: number | null = null;
  
  for (const block of blocks) {
    const content = block.slice(1, -1);
    
    if (content === '<') {
      if (prevDigit === null) continue; // No previous digit
      digits.push(prevDigit);
      continue;
    }
    
    let digit = parseInt(content[0]);
    
    for (let i = 1; i < content.length; i++) {
      if (content[i] === '+') {
        digit = (digit + 1) % 10;
      } else if (content[i] === '-') {
        digit = (digit - 1 + 10) % 10;
      }
    }
    
    digits.push(digit);
    prevDigit = digit;
  }
  
  if (digits.length !== 4) return null;
  
  return digits.join('');
}

decodeSantaPin('[1++][2-][3+][<]')
// "3144"

decodeSantaPin('[9+][0-][4][<]')
// "0944"

decodeSantaPin('[1+][2-]')
// null (solo 2 dígitos)