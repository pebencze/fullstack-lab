import { useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import { useEffect } from 'react'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const PAIRS = 5;

    // console.log(`Selected cards: ${selectedCards}`)
    console.log(`Matched cards:`)
    matchedCards.forEach( it =>
      console.log(`${it.name} ${it.index}`)
    )

    useEffect(() => {
      if (matchedCards.length == (PAIRS * 2)) {
        setIsGameOver(true)
      }
    }, [matchedCards])
    
    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name ) {
          setMatchedCards(prevCards => [...prevCards, ...selectedCards])
        }
    }, [selectedCards])

    async function startGame(e) {
      e.preventDefault()

      try {
        const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
        if (!response.ok) {
          throw new Error(`${response.status}: Failed to fetch emojis.`)
        }
        const data = await response.json()

        const dataSample = getDataSlice(data)
        const doubleSample = [...dataSample, ...dataSample]
        shuffle(doubleSample)
        console.log("data fetched!!")

        setEmojisData(doubleSample)
        setIsGameOn(true)
      } catch(error) {
        console.error(error.message)
      }
    }

    function getRandomIndices(data) {
      const randomIndices = []

      for (let i = 0; i < PAIRS; i++) {
        const randomNum = Math.floor(Math.random() * data.length)
        if (!randomIndices.includes(randomNum)) {
          randomIndices.push(randomNum)
        } else {
          i--;
        }
      }
      return randomIndices
    }

    function getDataSlice(data) {
      const randomIndices = getRandomIndices(data)
      const dataSlice = randomIndices.map(index => data[index])

      return dataSlice
    }
    
    function shuffle(array){
      let i = array.length, j, temp
      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[j]
        array[j] = array[i]
        array[i] = temp
      }
    }

    function turnCard(name, index) {
      const selectedCardEntry = selectedCards.some(it => it.index === index)
      if (selectedCards.length <= 1 && !selectedCardEntry) {
        setSelectedCards(prevCards => [...prevCards, {name, index}]) 
      } else if (selectedCards.length === 2 && !selectedCardEntry) {
        setSelectedCards([{name, index}])
      }
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && 
              <MemoryCard 
                  data={emojisData} 
                  handleClick={turnCard} 
                  selectedCards={selectedCards} 
                  matchedCards={matchedCards}
              />
            }
        </main>
    )
}