import Square from "./Square";
import { BoardProps } from "../types";
import { findWinner } from "../utils/findWinner";

function Board({ squares, onPlay, isXNext }: BoardProps) {
  function handleClick(index: number) {
    if (findWinner(squares) || squares[index]) {
      return;
    }

    const nextSquares = squares.slice();

    if (isXNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = findWinner(squares);

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="font-semibold text-xl mb-2">{status}</div>
      <div className="grid grid-cols-[repeat(3,_max-content)] gap-0">
        {squares.map((_, index) => (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
