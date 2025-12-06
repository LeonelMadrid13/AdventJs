function manufactureGifts( giftsToProduce: Array<{ toy: string, quantity: number }>): string[] {
  // Code here
    let gifts = [];
    for(let gift of giftsToProduce){
        let toy = gift.toy
        let quantity = gift.quantity
        if (quantity > 0) {
          for (let i = 0; i < quantity; i++) {
            gifts.push(toy)
          }
        }
    }
  return gifts
}