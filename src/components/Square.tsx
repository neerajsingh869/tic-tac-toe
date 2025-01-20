import { SquareProps } from "../types";

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

export default Square;
