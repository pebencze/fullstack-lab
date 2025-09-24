const lunchMenu = ['Greek Salad', 'Open Sandwich', 'Parsnip Soup', 'Flatbread and Dip']
const dinnerMenu = ['Lasagne', 'Strogonoff', 'Tagine', 'Katsu Curry']
const sweetMenu = ['Mixed Berry Ice Cream', 'Chocolate Brownie', 'Orange Cheesecake']

const eventMenuSpreaded = [...lunchMenu, ...dinnerMenu, ...sweetMenu]
const eventMenuJoined = lunchMenu.join(', ') + ', ' + dinnerMenu.join(', ') + ', ' + sweetMenu.join(', ')

console.log(...lunchMenu)
console.log(lunchMenu)
console.log(eventMenuSpreaded)
console.log(eventMenuJoined)


// ---------------------------------------- //

const averageSharePriceByMonthQ1 = [109.6, 103.3, 89.4]
const averageSharePriceByMonthQ2 = [109.3, 126.1, 103.3]
const averageSharePriceByMonthQ3 = [120.8, 102.3, 106.8]
const averageSharePriceByMonthQ4 = [110.9, 119.8, 113.7]

function findPriceExtremes(arr){
    const highest = Math.max(...arr)
    const lowest = Math.min(...arr)
    console.log(`The highest average share price was ${highest}`)
    console.log(`The lowest average share price was ${lowest}`)
}

findPriceExtremes([
    ...averageSharePriceByMonthQ1,
    ...averageSharePriceByMonthQ2,
    ...averageSharePriceByMonthQ3,
    ...averageSharePriceByMonthQ4
])