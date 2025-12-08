// Script for day7 
function drawTree(height: number, ornament: string, frequency: number): string {
  // Code here
    const treeLines: string[] = []
    const width = height * 2 - 1
    let position = 1 // Contador global de posiciones
  
    for (let i = 0; i < height; i++) {
        const spaces = Math.floor((width - (i * 2 + 1)) / 2)
        const starsCount = i * 2 + 1
        
        let line = ' '.repeat(spaces)
        
        // Construir la línea con asteriscos u ornamentos
        for (let j = 0; j < starsCount; j++) {
            if (position % frequency === 0) {
                line += ornament
            } else {
                    line += '*'
            }
            position++
        }
        treeLines.push(line)
    }

    const stump = ' '.repeat(Math.floor((width-1)/2)) + '#'
    treeLines.push(stump)
    return treeLines.join('\n')
}

console.log(drawTree(5, 'o', 2))
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

// console.log(drawTree(3, '@', 3))
//   *
//  *@*
// *@**@
//   #

//console.log(drawTree(4, '+', 1))
//    +
//   +++
//  +++++
// +++++++
//    #