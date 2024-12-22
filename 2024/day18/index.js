/**
 * @param {string} agenda
 * @param {string} phone
 * @returns {{ name: string, address: string } | null}
 */
function findInAgenda(agenda, phone) {

  const lines = agenda.split('\n')
  let counter = 0
  
  const nameRegex = new RegExp(/(?<=<)(?:.*)(?=>)/)
  const phoneRegex = new RegExp(/(?<=^|\s)\+\d{1,2}(?:-\d*){3}(?=$|\s)/)
  const replaceRegex = new RegExp(/<(?:.*)>|(?<=^|\s)\+\d{1,2}(?:-\d*){3}(?=$|\s)/g)
  
  const result = { name: '', address: '' }

  for (let i = 0; i < lines.length; i++) {
    
    if (counter > 1) return null
    const data = lines[i]
    const dataPhone = `${data.match(phoneRegex)?.[0]}`

    if (!dataPhone.match(phone)) continue
    const name = `${data.match(nameRegex)?.[0]}`
    const address = data.replaceAll(replaceRegex, '').trim()

    result.name = name
    result.address = address
    counter++
  }

  return counter === 1 ? result : null
}



const agenda = `+34-600-123-456 Calle Gran Via 12 <Juan Perez>
Plaza Mayor 45 Madrid 28013 <Maria Gomez> +34-600-987-654
<Carlos Ruiz> +1-800-555-0199 Fifth Ave New York`;

console.log(findInAgenda(agenda, "34-600-123-456"));
// { name: "Juan Perez", address: "Calle Gran Via 12" }

console.log(findInAgenda(agenda, "600-987"));
// // { name: "Maria Gomez", address: "Plaza Mayor 45 Madrid 28013" }

console.log(findInAgenda(agenda, "111"));
// // null
// // Explanation: No results

console.log(findInAgenda(agenda, "1"));
// // null
// // Explanation: Too many results
