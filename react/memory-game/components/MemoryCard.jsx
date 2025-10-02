import {decodeEntity} from 'html-entities';
import EmojiButton from './EmojiButton';

export default function MemoryCard({ data, handleClick, selectedCards, matchedCards }) {
    const cardEl = data.map((emoji, index) => {
        const selectedCardEntry = selectedCards.some(card => card.index === index)
        const matchedCardEntry = matchedCards.some(card => card.index === index)

        const cardStyle = 
            matchedCardEntry ? "card-item--matched" :
            selectedCardEntry ? "card-item--selected" :
            ""

        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton 
                    content={decodeEntity(emoji.htmlCode[0])}
                    handleClick={() => handleClick(emoji.name, index)}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                />
            </li>
        )
    }
    )
    
    return <ul className="card-container">{cardEl}</ul>
}