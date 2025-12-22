import React from 'react';
import Square from './Square'
import { calculateWinner } from '../components/utils/calculateWinner.js';
import { useId } from 'react';
import { WINNER, NEXT_PLAYER, X, O} from '../constants/common.js';

export default function Board({ xIsNextValue,squares, onPlay }) {
const id = useId()

 function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNextValue ? X : O;
    onPlay(nextSquares);
  }
    function renderSquare(i,index) {
      return <Square key= {`${id}-${index}`} value={squares[i]} onSquareClick={() => handleClick(i)} />;
    }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = WINNER + winner;
  } else {
    status = NEXT_PLAYER + (xIsNextValue ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{[0, 1, 2].map(renderSquare)}</div>
      <div className="board-row">{[3, 4, 5].map(renderSquare)}</div>
      <div className="board-row">{[6, 7, 8].map(renderSquare)}</div>
    </>
  );
}
