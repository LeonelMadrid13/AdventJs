/** 
 *  @param {string[]} gifts
 *  @returns {boolean} True if the gift is inside the box
 */
function inBox(box) {
    // Check top and bottom rows to ensure they are full of #
    const topRow = box[0];
    const bottomRow = box[box.length - 1];
    if (!/^[#]+$/.test(topRow) || !/^[#]+$/.test(bottomRow)) {
        return false;
    }

    // Ensure all middle rows start and end with # and find *
    let starFound = false;
    for (let i = 1; i < box.length - 1; i++) {
        const row = box[i];
        if (!/^#.*#$/.test(row)) return false; // Check row edges
        if (row.includes("*")) {
            // Ensure * is not on the edges
            const starIndex = row.indexOf("*");
            if (starIndex === 0 || starIndex === row.length - 1) return false;
            starFound = true;
        }
    }

    return starFound;
}


console.log(inBox([
    "###",
    "#*#",
    "###"
])) // ➞ true

console.log(inBox([
    "####",
    "#* #",
    "#  #",
    "####"
])) // ➞ true

console.log(inBox([
    "#####",
    "#   #",
    "#  #*",
    "#####"
])) // ➞ false

console.log(inBox([
    "#####",
    "#   #",
    "#   #",
    "#   #",
    "#####"
])) // ➞ false