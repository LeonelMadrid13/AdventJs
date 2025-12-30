// Script for day19 
function revealSantaRoute(routes: string[][]): string[] {
  // Code here
    const routeMap: string[] = [...routes[0]];

    for(let i = 1; i < routes.length; i++) {
        const lastDestination = routeMap[routeMap.length - 1];
        const nextRoute = routes.find(route => route[0] === lastDestination);
        if (nextRoute) {
            routeMap.push(nextRoute[1]);
        }
    }
    return routeMap
}


revealSantaRoute([
  ['MEX', 'CAN'],
  ['UK', 'GER'],
  ['CAN', 'UK']
])
// → ['MEX', 'CAN', 'UK', 'GER']

revealSantaRoute([
  ['USA', 'BRA'],
  ['JPN', 'PHL'],
  ['BRA', 'UAE'],
  ['UAE', 'JPN'],
  ['CMX', 'HKN']
])
// → ['USA', 'BRA', 'UAE', 'JPN', 'PHL']

revealSantaRoute([
  ['STA', 'HYD'],
  ['ESP', 'CHN']
])
// → ['STA', 'HYD']