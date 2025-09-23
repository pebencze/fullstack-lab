import { interplanetaryDestinationsArr as destinations, shortSpaceTripsArr} from './data.js'
import getMatchingTripsArr from './searchFunction.js'

console.log(destinations)
console.log(shortSpaceTripsArr)
console.log(getMatchingTripsArr(destinations, 'moon'))