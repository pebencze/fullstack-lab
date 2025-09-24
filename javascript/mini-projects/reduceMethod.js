const rainJanuaryByWeek = [ 10, 20, 0, 122 ]

const totalRainfallJanuary = rainJanuaryByWeek.reduce(function(total, currentElement){
    return total + currentElement
})

console.log(totalRainfallJanuary)


const grades = [75, 83, 66, 43, 55, 99, 87, 16, 89, 64, 70, 80, 94, 77, 66, 73]

const totalGrades = grades.reduce((previous, current) => {
    return previous + current;
});


console.log(`The class average is ${totalGrades / grades.length}`)