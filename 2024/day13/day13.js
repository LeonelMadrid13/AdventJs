/** 
 * @param {string} moves
 * @returns {true|[number, number]} Return true if robot returns or position
 */
/**
 * @param {string[]} moves
 * @returns {true|[number, number]} Return true if robot returns or position
 */
function isRobotBack(moves) {
    let position = [0, 0];
    let inverted = false, multiply = false, previously = false;

    const invertedMoves = { R: 'L', L: 'R', U: 'D', D: 'U' };
    const moveDeltas = { R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1] };
    const moveCounts = { R: 0, L: 0, U: 0, D: 0 };

    const resetFlags = () => { inverted = multiply = previously = false; };

    for (const move of moves.split('')) {
        if (move in moveDeltas) {
            const actualMove = inverted ? invertedMoves[move] : move;
            const [dx, dy] = moveDeltas[actualMove];
            const multiplier = multiply ? 2 : 1;

            if (!previously || moveCounts[actualMove] === 0) {
                position[0] += dx * multiplier;
                position[1] += dy * multiplier;
                moveCounts[actualMove] += multiplier;
            }
            resetFlags();
        } else if (move === '*') {
            multiply = true;
        } else if (move === '!') {
            inverted = true;
        } else if (move === '?') {
            previously = true;
        }
    }

    return position[0] === 0 && position[1] === 0 ? true : position;
}


console.log(isRobotBack("R")); // [1, 0]
console.log(isRobotBack("RL")); // true
console.log(isRobotBack("RLUD")); // true
console.log(isRobotBack("*RU")); // [2, 1]
console.log(isRobotBack("R*U")); // [1, 2]
console.log(isRobotBack("LLL!R")); // [-4, 0]
console.log(isRobotBack("R?R")); // [1, 0]
console.log(isRobotBack("U?D")); // true
console.log(isRobotBack("R!L")); // [2,0]
console.log(isRobotBack("U!D")); // [0,2]
console.log(isRobotBack("R?L")); // true
console.log(isRobotBack("U?U")); // [0,1]
console.log(isRobotBack("*U?U")); // [0,2]
console.log(isRobotBack("U?D?U")); // true