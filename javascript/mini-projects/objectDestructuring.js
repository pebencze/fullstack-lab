const favouriteFilm = {
    title: "Trainspotting",
    year: 1996,
    director: "Danny Boyle",
    star: "Ewan McGregor",
    rating: "8.1",
}

// destructuring happens here
const {title, year, director, star, rating} = favouriteFilm

console.log(
    `My favourite film is ${title} from ${year}
    directed by ${director} starring ${star} 
    with a rating of ${rating}`
);

// instead of: 
console.log(
    `My favourite film is ${favouriteFilm.title} from ${year}
    directed by ${favouriteFilm.director} starring ${favouriteFilm.star} 
    with a rating of ${favouriteFilm.rating}`
);