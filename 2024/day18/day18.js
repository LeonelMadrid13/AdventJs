/**
 * @param {string} agenda
 * @param {string} phone
 * @returns {{ name: string, address: string } | null}
 */
function findInAgenda(agenda, phone) {
    const lines = agenda.split('\n');
    const phoneRegex = /\+\d{1,2}-\d{3}-\d{3}-\d{3}/;
    const nameRegex = /<([^>]+)>/;

    const matches = lines
        .map(line => {
            const phoneMatch = line.match(phoneRegex);
            const nameMatch = line.match(nameRegex);

            if (phoneMatch && phoneMatch[0].includes(phone)) {
                const address = line
                    .replace(phoneMatch[0], '')
                    .replace(nameMatch[0], '')
                    .trim();
                return { name: nameMatch[1], address };
            }
            return null;
        })
        .filter(result => result);

    return matches.length === 1 ? matches[0] : null;
}




const agenda = `+34-600-123-456 Calle Gran Via 12 <Juan Perez>
Plaza Mayor 45 Madrid 28013 <Maria Gomez> +34-600-987-654
<Carlos Ruiz> +1-800-555-0199 Fifth Ave New York`

findInAgenda(agenda, '34-600-123-456')
// { name: "Juan Perez", address: "Calle Gran Via 12" }

// findInAgenda(agenda, '600-987')
// // { name: "Maria Gomez", address: "Plaza Mayor 45 Madrid 28013" }

// findInAgenda(agenda, '111')
// // null
// // Explanation: No results

// findInAgenda(agenda, '1')
// // null
// // Explanation: Too many results