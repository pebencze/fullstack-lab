import Header from '@/components/Header';
import Entry from './components/Entry';
import Joke from './components/Joke';

function App(){
  return (
    <>
      <Header />
      <main className="container">
        <Entry 
          img={{
              src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
              alt: "Mount Fuji"
          }}
          title="Mount Fuji"
          country="Japan"
          googleMapsLink="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu"
          dates="12 Jan, 2021 - 24 Jan, 2021"
          description="Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists."
        />
      </main>
    </>
  )
}

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

export default App;