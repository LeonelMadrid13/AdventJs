function createXmasTree(height, ornament) {
    /* Code here */
    const Width = height * 2 - 1
    const Trunk = "_".repeat((Width - 1) / 2) + "#" + "_".repeat((Width - 1) / 2)
    let tree = ''
    for (let i = 1; i <= height; i++) {
        let space = "_".repeat((Width - (i * 2 - 1)) / 2)
        let star = ornament.repeat(i * 2 - 1)
        tree += space + star + space + '\n'
    }
    tree += Trunk + '\n' + Trunk
    return tree
}

// const tree = createXmasTree(5, '*')
// console.log(tree)
// /*
// ____*____
// ___***___
// __*****__
// _*******_
// *********
// ____#____
// ____#____
// */

// const tree2 = createXmasTree(3, '+')
// console.log(tree2)
// /*
// __+__
// _+++_
// +++++
// __#__
// __#__
// */

// const tree3 = createXmasTree(6, '@')
// console.log(tree3)
// /*
// _____@_____
// ____@@@____
// ___@@@@@___
// __@@@@@@@__
// _@@@@@@@@@_
// @@@@@@@@@@@
// _____#_____
// _____#_____
// */

const tree3 = createXmasTree(10, '@')
console.log(tree3)
/*
_________@_________
________@@@________
_______@@@@@_______
______@@@@@@@______
_____@@@@@@@@@_____
____@@@@@@@@@@@____
___@@@@@@@@@@@@@___
__@@@@@@@@@@@@@@@__
_@@@@@@@@@@@@@@@@@_
@@@@@@@@@@@@@@@@@@@
_________#_________
_________#_________
*/
