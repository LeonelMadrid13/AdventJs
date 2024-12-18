/**
 * @param {string} agenda
 * @param {string} phone
 * @returns {{ name: string, address: string } | null}
 */
function findInAgenda(agenda, phone) {
  const lines = agenda.split("\n");
  const phoneRegex = /\+\d{1,2}-\d{3}-\d{3}-\d{3}/;
  const nameRegex = /<([^>]+)>/;

  const lineMap = lines.flatMap((line) => {
    const phoneMatch = line.match(phoneRegex);
    const listPhone = phoneMatch[0];
    const nameMatch = line.match(nameRegex);
    const listName = nameMatch[0];
    const name = nameMatch[1];

    if (phoneMatch) {
      if (listPhone.includes(phone)) {
        const lineNoPhone = line.replace(listPhone, "");
        const lineNoName = lineNoPhone.replace(listName, "");
        const address = lineNoName.trim();
        return { name, address };
      }
    }
    return null;
  });

  const matches = lineMap.filter((line) => line);

  if (matches.length === 1) {
    return matches[0];
  }
  return null;
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
