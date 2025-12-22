import { useState } from 'react'
import Board from './Board.jsx'

export default function Game() {
const [squares, setSquares] = useState(Array(9).fill(null));
const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(nextSquares) {
     setSquares(nextSquares);
     setXIsNext(!xIsNext);
  }
function resetGame() {
  setSquares(Array(9).fill(null));
  setXIsNext(true);
}

  return (
    <>
    <Board xIsNextValue={xIsNext} squares={squares} onPlay={handlePlay} />
    <button onClick={resetGame}>Reset</button>
    </>
  );
}
