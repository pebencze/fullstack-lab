export default function EmojiButton({content, handleClick, selectedCardEntry, matchedCardEntry}){

    const btnContent = (selectedCardEntry || matchedCardEntry) ? content : "?"

    let btnStyle
    if (matchedCardEntry) {
        btnStyle = "btn--emoji__back--matched"
    } else if (selectedCardEntry) {
        btnStyle = "btn--emoji__back--selected"
    } else {
        btnStyle = "btn--emoji__front"
    }

    return (
        <button 
            className={`btn btn--emoji ${btnStyle}`}
            onClick={handleClick}
        >
            {btnContent}
        </button>
    )
}

