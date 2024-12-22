/**
 * @param {number} weight - Total weight of the gifts
 * @returns {string} - Stacked boxes represented as ASCII art
 */
function distributeWeight(weight) {
  const boxRepresentations = {
    1: [" _ ", "|_|"],
    2: [" ___ ", "|___|"],
    5: [" _____ ", "|     |", "|_____|"],
    10: [" _________ ", "|         |", "|_________|"]
  }
  console.log({ weight });
  console.log({ boxRepresentations });
  // Code here
  return '';
}

distributeWeight(1);
// Returns:
//  _
// |_|

// distributeWeight(2);
// // Returns:
// //  ___
// // |___|

// distributeWeight(3);
// // Returns:
// //  _
// // |_|_
// // |___|

// distributeWeight(4);
// // Returns:
// //  ___
// // |___|
// // |___|

// distributeWeight(5);
// // Returns:
// //  _____
// // |     |
// // |_____|

// distributeWeight(6);
// // Returns:
// //  _
// // |_|___
// // |     |
// // |_____|