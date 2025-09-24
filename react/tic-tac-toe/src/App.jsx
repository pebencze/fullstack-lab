
/**
 * Default function of our module
 * @returns a fragment denoted by <> and </>
 */
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

/**
 * 
 * @param value: square component can be passed a _prop_ called "value";
 * when using it, add curly braces `{value}` to escape from JSX to JavaScript
 * @returns Square component, a child component of Board
 */
function Square({value}) { 
  return <button className="square">{value}</button>;
}
