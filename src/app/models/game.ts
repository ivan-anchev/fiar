export interface Board extends Array<Array<string>> {
  [key: number]: Array<string>;
}

export interface PiecePosition {
  i: number;
  j: number;
}

export interface Win {
  winner: string;
  winningSequence: Array<PiecePosition>;
}
