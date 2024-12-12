/** 
 *  @param {string} packages with parentheses
 *  @returns {string} Fixed and sorted packages
 */
// function fixPackages(packages) { 4 stars without clg, 1,926 ops/s
//     // Code here
//     let regex = new RegExp(/\([^()]*\)/g)
//     while (packages.includes('(')) {
//         packages = packages.replace(regex, (match) => {
//             console.log(`match: ${match}`)
//             return match.slice(1, -1).split('').reverse().join('')
//         })
//     }
//     return packages
// }

function fixPackages(packages) { // 4 stars and 1,350 ops/s
    let stack = [];

    for (let char of packages) {
        if (char === ')') {
            // Pop characters until '(' and reverse the substring
            let temp = '';
            while (stack[stack.length - 1] !== '(') {
                temp = stack.pop() + temp;
            }
            stack.pop(); // Remove the '('
            // Push the reversed substring back to the stack
            for (let c of temp.split('').reverse()) {
                stack.push(c);
            }
        } else {
            // Push all other characters to the stack
            stack.push(char);
        }
    }

    // Convert stack back to a string
    return stack.join('');
}

console.log("-----------------")
console.log(fixPackages('a(cb)de'))
// ➞ "abcde"
// We reverse "cb" inside the parentheses

console.log("-----------------")
console.log(fixPackages('a(bc(def)g)h'))
// ➞ "agdefcbh"
// 1st we reverse "def" → "fed", then we reverse "bcfedg" → "gdefcb"

console.log("-----------------")
console.log(fixPackages('abc(def(gh)i)jk'))
// ➞ "abcighfedjk"
// 1st we reverse "gh" → "hg", then "defhgi" → "ighfed"

console.log("-----------------")
console.log(fixPackages('a(b(c))e'))
// ➞ "acbe"
// 1st we reverse "c" → "c", then "bc" → "cb"