// Script for day15 
type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
  // Code here
    const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
        }
    
        return String(valueA).localeCompare(String(valueB));
    });
    const columnNames = Object.keys(sortedData[0]);
    const columnWidths = columnNames.map((colName, index) => {
        const headerWidth = 1;
        
        const maxValueWidth = Math.max(
            ...sortedData.map(row => String(row[colName]).length)
        );
        
        return Math.max(headerWidth, maxValueWidth) + 1;
    });

    const createSeparator = (): string => {
        const parts = columnWidths.map(width => '-'.repeat(width + 1));
        return '+' + parts.join('+') + '+';
    };

    const createHeaderRow = (): string => {
        const headers = columnNames.map((_, index) => {
        const letter = String.fromCharCode(65 + index);
        const width = columnWidths[index];
            return ' ' + letter + ' '.repeat(width - letter.length);
        });
    
        return '|' + headers.join('|') + '|';
    };

    const createDataRows = (): string[] => {
        return sortedData.map(row => {
        const cells = columnNames.map((colName, index) => {
            const value = String(row[colName]);
            const width = columnWidths[index];
                return ' ' + value + ' '.repeat(width - value.length);
            });
            return '|' + cells.join('|') + '|';
        });
    };

    const separator = createSeparator();
    const header = createHeaderRow();
    const dataRows = createDataRows();

    const table = [
        separator,
        header,
        separator,
        ...dataRows,
        separator
    ];

  
  return table.join('\n');
}

console.log("=== Prueba 1: Ordenar por nombre ===");
const result1 = drawTable(
  [
    { name: 'Charlie', city: 'New York' },
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' }
  ],
  'name'
);
console.log(result1);
console.log("\nEsperado:");
console.log("+---------+----------+");
console.log("| A       | B        |");
console.log("+---------+----------+");
console.log("| Alice   | London   |");
console.log("| Bob     | Paris    |");
console.log("| Charlie | New York |");
console.log("+---------+----------+");

console.log("\n\n=== Prueba 2: Ordenar por cantidad (numérico) ===");
const result2 = drawTable(
  [
    { gift: 'Book', quantity: 5 },
    { gift: 'Music CD', quantity: 1 },
    { gift: 'Doll', quantity: 10 }
  ],
  'quantity'
);
console.log(result2);
console.log("\nEsperado:");
console.log("+----------+----+");
console.log("| A        | B  |");
console.log("+----------+----+");
console.log("| Music CD | 1  |");
console.log("| Book     | 5  |");
console.log("| Doll     | 10 |");
console.log("+----------+----+");

console.log("\n\n=== Prueba 3: Ordenar por ciudad ===");
const result3 = drawTable(
  [
    { name: 'Charlie', city: 'New York' },
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' }
  ],
  'city'
);
console.log(result3);