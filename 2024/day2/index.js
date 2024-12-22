function createFrame(names) {
    // Code here
    let max = Math.max(...names.map(name => name.length))
    const box = "*".repeat(max + 4)
    const content = names.map(name => "* " + name + " ".repeat(max - name.length)).join(" *\n")

    return box + "\n" + content + " *\n" + box
}

createFrame(['midu', 'madeval', 'educalvolpz'])

// Expected result:
/*
***************
* midu        *
* madeval     *
* educalvolpz *
***************
*/
createFrame(['midu'])

// Expected result:
/*
********
* midu *
********
*/
createFrame(['a', 'bb', 'ccc'])

// Expected result:
/*
*******
* a   *
* bb  *
* ccc *
*******
*/
createFrame(['a', 'bb', 'ccc', 'dddd'])
// Expected result:
/*
********
* a    *
* bb   *
* ccc  *
* dddd *
********
*/