const distanceWalkedMiles = [12, 345, 6, 443, 233, 90]

const milesToKmRate = 1.60934

const kmWalked = distanceWalkedMiles.map(miles => miles * milesToKmRate)
console.log(kmWalked)

const logKmWalked = kmWalked.map(function(km, index) {
    console.log(`${index}: ${km} km`)
})
