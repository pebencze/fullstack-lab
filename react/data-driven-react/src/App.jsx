// import Header from '@/components/Header';
// import Entry from '@/components/Entry';
import journalData from '@/data/journalData';
import { Entry, Header } from './components';

function App(){

  const entries = journalData.map(entry => {
    return (
      <Entry 
         key={entry.id} // key 
         img={entry.img}
         country={entry.country}
         googleMapsLink={entry.googleMapsLink}
         title={entry.title}
         dates={entry.dates}
         description={entry.description}
      />
    )
  })

  return (
    <>
      <Header />
      <main className="container">{entries}</main>
    </>
  )
}


// ------------------ STUDY -------------------------------- //

// import Joke from './components/Joke';
// import jokesData from  './data/jokesData';

// function App(){
//   return (
//     <>
//       <Joke
//         punchline="I can't wait to see her face light up when she opens it."
//         upVotes={0}
//         isPun={true}
//       />
//       <Joke
//         setup="How did the hacker escape the police?"
//         punchline="I can't wait to see her face light up when she opens it."
//         upVotes={6}
//         isPun={true}
//       />
//       <Joke
//         setup="I got my daughter a fridge for her birthday."
//         punchline="He just ransomware!"
//         upVotes={10}
//         isPun={true}
//       />
//       <Joke
//         setup="What's the best thing about Switzerland?"
//         punchline="I don't know, but the flag is a big plus!"
//         upVotes={2}
//         isPun={false}
//       />
//     </>
//   )
// }


// /**
//  * jokeElements is an array of JSX elements.
//  */
// function App() {

//   const jokeElements = jokesData.map(joke => {
//     return (<Joke
//         setup={joke.setup}
//         punchline={joke.punchline}
//         upVotes={joke.upVotes}
//         isPun={joke.isPun}
//       />)
//   });

//   return (
//      <main>{jokeElements}</main>
//   )
// };


// function App() {
    
//     /**
//      * Challenge: manually turn this string array into an array of
//      * JSX elements by surrounding each ninja turtle with an <h2> element
//      */
    
//     const ninjaTurtles = ["Donatello", "Michaelangelo", "Rafael", "Leonardo"]
//     const ninjaTurtlesJsx = ninjaTurtles.map(i => { return(<h2>{i}</h2>)})
//     return (
//         <main>
//             {ninjaTurtles}
//             {ninjaTurtlesJsx}
//         </main>
//     )
// }

export default App;