/**
 * @param {string} s
 * @returns {string}
 */
function removeSnow(s) {
    const stack = [];

    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop(); // Remove the last character if it matches the current one
        } else {
            stack.push(char); // Add the current character to the stack
        }
    }

    return stack.join(""); // Combine stack elements into the final string
}

console.log(removeSnow("zxxzoz")); // -> "oz"
// 1. Remove "xx", resulting in "zzoz"
// 2. Remove "zz", resulting in "oz"

console.log(removeSnow("abcdd")); // -> "abc"
// 1. Remove "dd", resulting in "abc"

console.log(removeSnow("zzz")); // -> "z"
// 1. Remove "zz", resulting in "z"

console.log(removeSnow("a")); // -> "a"
// No duplicate piles