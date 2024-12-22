/**
  * @param {Array<Object>} data
  * @returns {string}
  */
function drawTable(data) {
    let result = '';
    let keys = Object.keys(data[0]);
    let maxLength = keys.map(key => key.length);

    // Calculate max column widths
    data.forEach(row => {
        keys.forEach((key, index) => {
            maxLength[index] = Math.max(maxLength[index], row[key].toString().length);
        });
    });

    // Create the header and divider lines
    let header = '+';
    let divider = '+';
    keys.forEach((key, index) => {
        header += '-'.repeat(maxLength[index] + 2) + '+';
        divider += '-'.repeat(maxLength[index] + 2) + '+';
    });

    // Build the table
    result += header + '\n';
    result += '| ' + keys.map((key, index) =>
        key[0].toUpperCase() + key.slice(1).padEnd(maxLength[index] - 1)
    ).join(' | ') + ' |\n';
    result += divider + '\n';

    data.forEach(row => {
        result += '| ' + keys.map((key, index) =>
            row[key].toString().padEnd(maxLength[index])
        ).join(' | ') + ' |\n';
    });

    result += divider;
    return result;
}


const table1 = [
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' },
    { name: 'Charlie', city: 'New York' }
]

console.log(drawTable(table1))
// +---------+-----------+
// | Name    | City      |
// +---------+-----------+
// | Alice   | London    |
// | Bob     | Paris     |
// | Charlie | New York  |
// +---------+-----------+

const table2 = [
    { gift: 'Doll', quantity: 10 },
    { gift: 'Book', quantity: 5 },
    { gift: 'Music CD', quantity: 1 }
]

console.log(drawTable(table2))
// +----------+----------+
// | Gift     | Quantity |
// +----------+----------+
// | Doll     | 10       |
// | Book     | 5        |
// | Music CD | 1        |
// +----------+----------+