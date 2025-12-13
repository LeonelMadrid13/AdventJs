function elfBattle(elf1: string, elf2: string): number {
  let life1 = 3;
  let life2 = 3;
  const rounds = Math.max(elf1.length, elf2.length);

  function calculateDamage(attackMove: string, defenseMove: string): number {
    if (attackMove === "F") return 2;
    if (attackMove === "A" && defenseMove !== "B") return 1;
    return 0;
  }

  function determineWinner(life1: number, life2: number): number {
    if (life1 <= 0 && life2 <= 0) return 0;
    if (life1 <= 0) return 2;
    if (life2 <= 0) return 1;
    if (life1 === life2) return 0;
    return life1 > life2 ? 1 : 2;
  }

  for (let i = 0; i < rounds; i++) {
    if (life1 <= 0 || life2 <= 0) break;

    const move1 = elf1[i] || "";
    const move2 = elf2[i] || "";

    const damage1 = calculateDamage(move2, move1);
    const damage2 = calculateDamage(move1, move2);

    life1 -= damage1;
    life2 -= damage2;
  }

  return determineWinner(life1, life2);
}


console.log(elfBattle('A', 'B'), 0)
// Ronda 1: A vs B -> Elfo 2 bloquea
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 3 de vida
// → 0

console.log(elfBattle('F', 'B'), 1)
// Ronda 1: F vs B -> Elfo 2 recibe 2 de daño (F no se bloquea)
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 1 de vida
// → 1

console.log(elfBattle('AAB', 'BBA'), 0)
// R1: A vs B → Elfo 2 bloquea
// R2: A vs B → Elfo 2 bloquea
// R3: B vs A → Elfo 1 bloquea
// Resultado: Elfo 1 = 3, Elfo 2 = 3
// → 0

console.log(elfBattle('AFA', 'BBA'), 1)
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1
// Resultado: Elfo 1 = 2, Elfo 2 = 0
// → 1

console.log(elfBattle('AFAB', 'BBAF'), 1)
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1 → Elfo 2 llega a 0 ¡Batalla termina!
// R4: no se juega, ya que Elfo 2 no tiene vida
// → 1

console.log(elfBattle('AA', 'FF'), 2)
// R1: A vs F → Elfo 1 -2, Elfo 2 -1
// R2: A vs F → Elfo 1 -2, Elfo 2 -1 → Elfo 1 llega a -1
// → 2