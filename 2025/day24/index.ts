// Script for day24 
function isTreesSynchronized(
  tree1: { value: string; left?: any; right?: any } | undefined,
  tree2: { value: string; left?: any; right?: any } | undefined
): [boolean, string] {
  const rootValue = tree1?.value ?? tree2?.value ?? '';
  
  const areMirrors = (node1: { value: string; left?: any; right?: any } | undefined, node2: { value: string; left?: any; right?: any } | undefined): boolean => {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;
    
    if (node1.value !== node2.value) return false;
    
    return areMirrors(node1.left, node2.right) && areMirrors(node1.right, node2.left);
  };
  
  return [areMirrors(tree1, tree2), rootValue];
}

const tree1 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

const tree2 = {
  value: '🎄',
  left: { value: '🎅' },
  right: { value: '⭐' }
}

console.log(isTreesSynchronized(tree1, tree2)) // [true, '🎄']

/*
  tree1          tree2
   🎄              🎄
  / \             / \
⭐   🎅         🎅   ⭐
*/

const tree3 = {
  value: '🎄',
  left: { value: '🎅' },
  right: { value: '🎁' }
}

console.log(isTreesSynchronized(tree1, tree3)) // [false, '🎄']

const tree4 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

console.log(isTreesSynchronized(tree1, tree4)) // [false, '🎄']

console.log(isTreesSynchronized(
  { value: '🎅' },
  { value: '🧑‍🎄' }
)) // [false, '🎅']