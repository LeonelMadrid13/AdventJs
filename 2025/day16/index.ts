// Script for day16 
type Gifts = number[]
type MaxWeight = number
type Result = number | null

function packGifts(gifts: Gifts, maxWeight: MaxWeight): Result {
  // Code here
    if(gifts.length === 0) return 0;
    if(gifts.some(weight => weight > maxWeight)) return null;
    let counter = 1;
    let currentWeight = 0;
    for (const giftWeight of gifts) {
        if(currentWeight + giftWeight > maxWeight){
            counter++;
            currentWeight = giftWeight;
        } else {
            currentWeight += giftWeight;
        }
    }
  return counter;
}

console.log(packGifts([2, 3, 4, 1], 5))
// 2 trineos
// Trineo 1: 2 + 3 = 5
// Trineo 2: 4 + 1 = 5

console.log(packGifts([3, 3, 2, 1], 3))
// 3 trineos
// Trineo 1: 3
// Trineo 2: 3
// Trineo 3: 2 + 1 = 3

console.log(packGifts([1, 1, 1, 1], 2))
// 2 trineos
// Trineo 1: 1 + 1 = 2
// Trineo 2: 1 + 1 = 2

console.log(packGifts([5, 6, 1], 5))
// null
// Hay un regalo de peso 6 que no cabe

console.log(packGifts([], 10))
// 0 trineos
// No hay regalos que entregar

console.log(packGifts([1, 2, 3, 4, 5], 10))
