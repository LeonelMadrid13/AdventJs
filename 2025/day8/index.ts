export function findUniqueToy(toy: string): string {
    const toyArr: string[] = toy.split('')
    let charCount: { [key: string]: number } = {}

    for (let char of toyArr) {
        const lowerChar : string = char.toLowerCase()
        charCount[lowerChar] = (charCount[lowerChar] || 0) + 1
    }
    for (let char of toyArr) {
        if (charCount[char.toLowerCase()] === 1) {
            return char
        }
    }
    return ''
}

console.log(findUniqueToy('Gift')) // 'G'
// ℹ️ La G es la primera letra que no se repite
// y la devolvemos tal y como aparece

console.log(findUniqueToy('sS')) // ''
// ℹ️ Las letras se repiten, ya que no diferencia mayúsculas

console.log(findUniqueToy('reindeeR')) // 'i'
// ℹ️ La r se repite (aunque sea en mayúscula)
// y la e también, así que la primera es la 'i'

// Más casos:
console.log(findUniqueToy('AaBbCc')) // ''
console.log(findUniqueToy('abcDEF')) // 'a'
console.log(findUniqueToy('aAaAaAF')) // 'F'
console.log(findUniqueToy('sTreSS')) // 'T'
console.log(findUniqueToy('z')) // 'z'