export function filterGifts(gifts: string[]): string[] {
  // Code here
  const regex = new RegExp('#');
  return gifts.filter(gift => !regex.test(gift))
}
