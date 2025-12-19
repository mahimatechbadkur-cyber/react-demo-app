'use client'
import { SetStateAction, useState } from 'react'
import Board from './Board';

const Game: React.FC = () => {
const [squares, setSquares] = useState(Array(9).fill(null));
const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(nextSquares: SetStateAction<(string | null)[]>) {
    console.log("value of square", squares);
    console.log("value of nextSquare", nextSquares);
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
export default Game;