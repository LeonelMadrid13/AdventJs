// Script for day6 
export type Glove = { hand: 'L' | 'R'; color: string }

export function matchGloves(gloves: Glove[]): string[] {
  // Code here
  const glovesMap: Record<string, { L: number; R: number }> = {}
    for (const glove of gloves) {
        if (!glovesMap[glove.color]) {
            glovesMap[glove.color] = { L: 0, R: 0 }
        }
        glovesMap[glove.color][glove.hand]++
    }
    const pairs: string[] = []
    for (const color in glovesMap) {
        const count = Math.min(glovesMap[color].L, glovesMap[color].R)
        for (let i = 0; i < count; i++) {
            pairs.push(color)
        }
    }
  return pairs
}