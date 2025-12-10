export function drawGift(size: number, symbol: string): string {
  // Code here
  if (size < 2 ) return '';
  const top : string = symbol.repeat(size) + '\n'
  let middle : string = '';
  if (size > 2) {
    middle = (symbol + ' '.repeat(size - 2) + symbol + '\n').repeat(size - 2)
  }
  const bottom : string = symbol.repeat(size)
  return top + middle + bottom
}