import { useState } from "react";

import { BoardProps, SquareProps, Squares, SquareValue } from "./types";

function findWinner(squares: Squares): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function Square({ value, onSquareClick }: SquareProps) {
  console.log(value);
  return (
    <button
      className={`border-2 h-16 w-16 font-semibold text-3xl ${
        value === "X" ? "text-blue-700" : "text-red-700"
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

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

function Game() {
  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const isXNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: Squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description: string;
    if (move > 0) {
      description = "Go to #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move} className="mb-1">
        <button
          className="bg-gray-200 rounded-md p-1 px-2 border text-sm"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex gap-10">
      <div>
        {/* board */}
        <Board squares={currentSquares} onPlay={handlePlay} isXNext={isXNext} />
      </div>
      <ol className="list-decimal list-inside">
        {/* history */}
        {moves}
      </ol>
    </div>
  );
}

function App() {
  return (
    <main className="grid place-content-center min-h-screen">
      <Game />
    </main>
  );
}

export default App;
