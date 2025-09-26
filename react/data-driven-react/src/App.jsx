import Header from '@/components/Header';
import Entry from './components/Entry';
import Joke from './components/Joke';

// function App(){
//   return (
//     <>
//       <Header />
//       <Entry />
//     </>
//   )
// }

function App(){
  return (
    <>
      <Joke
        punchline="I can't wait to see her face light up when she opens it."
        upVotes={0}
        isPun={true}
      />
      <Joke
        setup="How did the hacker escape the police?"
        punchline="I can't wait to see her face light up when she opens it."
        upVotes={6}
        isPun={true}
      />
      <Joke
        setup="I got my daughter a fridge for her birthday."
        punchline="He just ransomware!"
        upVotes={10}
        isPun={true}
      />
      <Joke
        setup="What's the best thing about Switzerland?"
        punchline="I don't know, but the flag is a big plus!"
        upVotes={2}
        isPun={false}
      />
    </>
  )
}

export default App;