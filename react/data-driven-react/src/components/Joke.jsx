
/**
 * @details This is conditional rendering: { props.setup && <p className="setup">Setup: {props.setup}</p> }
 * meaning that the paragraph is only rendered if props.setup exists...
 * It is also possible to use ternary operators: { props.isPun === true ? <p>This is a pun!</p> : <p>This is not a pun!</p>}
 * Also, passing non-string props is possible via using {} curly brackets
 * @param {*} props 
 * @returns 
 */
export default function Joke(props) {
    return (
        <article>
            { props.setup && <p className="setup">Setup: {props.setup}</p> }
            <p className="punchline">Punchline: {props.punchline}</p>
            <p className="votes">{props.upVotes} votes up!</p>
            { props.isPun === true ? <p>This is a pun!</p> : <p>This is not a pun!</p>}
            <hr />
        </article>
    )
}