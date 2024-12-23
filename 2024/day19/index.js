/**
 * @param {number} weight - Total weight of the gifts
 * @returns {string} - Stacked boxes represented as ASCII art
 */
/**
 * @param {number} weight - Total weight of the gifts
 * @returns {string} - Stacked boxes represented as ASCII art
 */
function distributeWeight(weight) {
  const boxRepresentations = {
    1: [" _ ", "|_|"],
    2: [" ___ ", "|___|"],
    5: [" _____ ", "|     |", "|_____|"],
    10: [" _________ ", "|         |", "|_________|"],
  };

  const boxWeights = [10, 5, 2, 1];
  let remainingWeight = weight;
  const stack = [];

  // Create the stack of boxes
  for (const boxWeight of boxWeights) {
    while (remainingWeight >= boxWeight) {
      stack.push({ weight: boxWeight, box: boxRepresentations[boxWeight] });
      remainingWeight -= boxWeight;
    }
  }

  // Sort boxes by their weight (ascending) to place smaller boxes on top
  stack.sort((a, b) => a.weight - b.weight);

  // Merge the boxes into a single stack
  const result = [...stack[0].box]; // Start with the first box
  console.log({ result });
  for (let i = 1; i < stack.length; i++) {
    const box = stack[i].box;

    // Merge the last line of the result with the top line of the next box
    const lastLine = result.pop().trimEnd();
    console.log({ "length": box[0].length });
    const topLine = (result[0].length <= stack.length - 1)
      ? "_".repeat(result[0].length - box[0].length)
      : "";

    console.log({ lastLine, box, topLine });

    result.push(lastLine + topLine);

    // Add the remaining lines of the current box
    result.push(...box.slice(1));
  }

  return result.join("\n");
}

// console.log("-------------------------");
// console.log(distributeWeight(1));
// // Returns:
// //  _
// // |_|

// console.log("-------------------------");
// console.log(distributeWeight(2));
// // Returns:
// //  ___
// // |___|

console.log("-------------------------");
console.log(distributeWeight(3));
// Returns:
//  _
// |_|_
// |___|

console.log("-------------------------");
console.log(distributeWeight(4));
// Returns:
//  ___
// |___|
// |___|

// console.log("-------------------------");
// console.log(distributeWeight(5));
// // Returns:
// //  _____
// // |     |
// // |_____|

// console.log("-------------------------");
// console.log(distributeWeight(6));
// // Returns:
// //  _
// // |_|___
// // |     |
// // |_____|
