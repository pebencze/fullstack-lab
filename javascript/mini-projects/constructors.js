function Gamer(name, score){
    this.name = name
    this.score = score
    this.incrementScore = function(){
        this.score++  
    }
}

const dave = new Gamer('Dave', 0)
const sarah = new Gamer('Sarah', 0)
const kerry = new Gamer('Kerry', 0)
dave.incrementScore()
sarah.incrementScore()
sarah.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
console.log(dave)
console.log(sarah)
console.log(kerry)

// ----------------------- //

String()
Number()
Array()
Object()
Boolean()

const person = {} // constructing an object, same as new Object();
person.name = 'Tom'
console.log(person)