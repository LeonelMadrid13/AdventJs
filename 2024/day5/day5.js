/*
Santa Claus's elves 🧝🧝‍♂️ have found a bunch of mismatched magic boots in the workshop. Each boot is described by two values:

- `type` indicates if it's a left boot (I) or a right boot (R).
- `size` indicates the size of the boot.

Your task is to help the elves pair all the boots of the same size having a left and a right one. To do this, you should return a list of the available sizes after pairing the boots.

*/

function organizeShoes(shoes) {
    const leftBoots = [];
    const rightBoots = [];
    const pairs = [];

    // Separate shoes into left and right boots based on type
    for (const shoe of shoes) {
        if (shoe.type === 'I') {
            leftBoots.push(shoe.size);
        } else {
            rightBoots.push(shoe.size);
        }
    }

    // Identify smaller and larger arrays
    const [smaller, larger] = leftBoots.length <= rightBoots.length
        ? [leftBoots, rightBoots]
        : [rightBoots, leftBoots];

    // Find matching pairs
    for (const size of smaller) {
        if (larger.includes(size)) {
            pairs.push(size);
        }
    }

    return pairs;
}


const shoes = [
    { type: 'I', size: 38 },
    { type: 'R', size: 38 },
    { type: 'R', size: 42 },
    { type: 'I', size: 41 },
    { type: 'I', size: 42 }
]

const organiced1 = organizeShoes(shoes)
console.log(organiced1)
// [38, 42]

const shoes2 = [
    { type: 'I', size: 38 },
    { type: 'R', size: 38 },
    { type: 'I', size: 38 },
    { type: 'I', size: 38 },
    { type: 'R', size: 38 }
]
const organiced2 = organizeShoes(shoes2)
console.log(organiced2)
// [38, 38]

const shoes3 = [
    { type: 'I', size: 38 },
    { type: 'R', size: 36 },
    { type: 'R', size: 42 },
    { type: 'I', size: 41 },
    { type: 'I', size: 42 }
]

const organiced3 = organizeShoes(shoes3)
console.log(organiced3)
// []