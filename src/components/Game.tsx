import { useState } from "react";

import Board from "./Board";
import { Squares } from "../types";

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
      description = "Go to move #" + move;
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

export default Game;
