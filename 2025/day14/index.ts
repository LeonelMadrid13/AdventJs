// Script for day14 
type Gift = string | number | boolean
type Workshop = Record<string, any>
type Path = string[]

function findGiftPath(workshop: Workshop, gift: Gift): Path {
  // Code here
  let path: Path = [];

  function dfs(obj: Workshop) : boolean{
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      
      if (value === gift) {
        path.push(key);
        return true;
      }
      
      if (typeof value === 'object' && value !== null) {
        path.push(key);
        const found = dfs(value);
        if (found) {
          return true;
        }else{
          path.pop();
        }
      }
    }
    return false;
  }

  dfs(workshop);
  
  return path;
}

const workshop = {
  storage: {
    shelf: {
      box1: 'train',
      box2: 'switch'
    },
    box: 'car'
  },
  gift: 'doll'
}

console.log(findGiftPath(workshop, 'train'))
// ➜ ['storage', 'shelf', 'box1']

//console.log(findGiftPath(workshop, 'switch'))
// ➜ ['storage', 'shelf', 'box2']

//console.log(findGiftPath(workshop, 'car'))
// ➜ ['storage', 'box']

//console.log(findGiftPath(workshop, 'doll'))
// ➜ ['gift']

//console.log(findGiftPath(workshop, 'plane'))
// ➜ []