/** 
 * @param {string} ornaments
 * @return {number} - The price of the tree
 */
function calculatePrice(ornaments) {
    // Code here
    const ornamentValue = {
        '*': 1,
        'o': 5,
        '^':10,
        '#': 50,
        '@': 100,
    }

    let price = 0
    for (let i = 0; i < ornaments.length; i++) {

        // check if the ornament on the right is higher than the one on the left
        // so we can subtract the value of the left ornament from the right ornament
        if (ornamentValue[ornaments[i]]) {
            if (ornamentValue[ornaments[i]] < ornamentValue[ornaments[i + 1]]) {
                price -= ornamentValue[ornaments[i]]
            } else {
                price += ornamentValue[ornaments[i]]
            }
        } else {
            return undefined
        }
    }
    return price      
}

console.log(calculatePrice('***')  )// 3   (1 + 1 + 1)
console.log(calculatePrice('*o')   )// 4   (5 - 1)
console.log(calculatePrice('o*')   )// 6   (5 + 1)
console.log(calculatePrice('*o*')  )// 5  (-1 + 5 + 1) 
console.log(calculatePrice('**o*') )// 6  (1 - 1 + 5 + 1) 
console.log(calculatePrice('o***') )// 8   (5 + 3)
console.log(calculatePrice('*o@')  )// 94  (-5 - 1 + 100)
console.log(calculatePrice('*#')   )// 49  (-1 + 50)
console.log(calculatePrice('@@@')  )// 300 (100 + 100 + 100)
console.log(calculatePrice('#@')   )// 50  (-50 + 100)
console.log(calculatePrice('#@Z')  )// undefined (Z is unknown)