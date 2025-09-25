import { useState } from "react"

/**
 * default function of our module
 * @returns 
 */
export default function Game () {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
      setXIsNext(!xIsNext);
      console.log(`History: `, history);
      console.log(`Next squares: `, nextSquares);

      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setHistory(history.slice(0, nextMove + 1));
    setXIsNext((nextMove % 2) === 0 );
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = (move > 0) ? ('Go to move #' + move) : ('Go to game start');

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}


/**
 * Parent Board component of Square, child of Game
 * @detail each row contains 3 Square elements that take a value prop;
 * the setSquares function triggers re-rendering of components that use the squares state
 * @returns a fragment denoted by <> and </>
 */
function Board({xIsNext, squares, onPlay}) {
  /**
   * 
   * @param nextSquares uses immutability -> we copy the original array's content
   * by using .slice() and so we create nextSquares array; this way, we don't have to change 
   * the parent array and it has benefits: re-rendering will only happen to the changed indexes,
   * not to the whole array; we can roll back or save a previous state
   */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row"> 
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/> 
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

/**
 * Child Square component
 * @param value: square component can be passed a _prop_ called "value";
 * when using it, add curly braces `{value}` to escape from JSX to JavaScript
 * @returns Square component, a child component of Board
 */
function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
