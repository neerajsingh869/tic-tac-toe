export type SquareValue = string | null;

export type Squares = SquareValue[];

export interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export interface BoardProps {
  squares: Squares;
  onPlay: (squares: Squares) => void;
  isXNext: boolean;
}
