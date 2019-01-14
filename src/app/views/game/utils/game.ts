import { Board, PiecePosition } from '../../../models/game';

const WINNING_SEQ_COUNT = 4;

export const createEmptyBoard = (): Board => Array(7).fill([]);
/**
 * Check for winning sequence
 * @param  board Board
 * @return <Array<PiecePosition>>
 */
export const checkForWin = (board: Board) => {
  return checkVertical(board) ||
         checkHorizontal(board) ||
         checkDiagonalLeftToRight(board) ||
         checkDiagonalRightToLeft(board);
};

/**
 * Check for vertical winning sequence
 * @param  board Board
 */
export const checkVertical = (board: Board) => {
    return board.map((column, columnIndex) => checkLine(column, columnIndex))
                .find(seq => !!seq);
};

/**
 * Check for left-to-right diagonal winning sequence
 *
 *  [x][x][x][x][-][-][-]
 *  [x][x][x][x][-][-][-]
 *  [x][x][x][x][x][-][-]
 *  [-][x][x][x][x][x][-]
 *  [-][-][x][x][x][x][-]
 *  [-][-][-][x][x][x][x]
 *
 * @param board Board
 * @return Array<PiecePosition>
 */
export const checkDiagonalLeftToRight = (board: Board): Array<PiecePosition> => {
  let winningSeq = null;
  for (const [ columnIndex, column ] of iterableEntries(board)) {

    if (winningSeq && winningSeq.length === WINNING_SEQ_COUNT) {
      break;
    }

    for (const [ cellIndex, cell ] of iterableEntries(column)) {
      const checkValue = cell;
      const maxReachCell = getMaxReachCell(board, columnIndex, cellIndex);
      // fourth cell is out of reach (does not exist) or is different than value being checked
      if (!maxReachCell || checkValue !== maxReachCell) {
        continue;
      } else {
        const diagonal = extractDiagonal(board, columnIndex, cellIndex);
        if (diagonal.every(value => value === checkValue)) {
          winningSeq = diagonal.map<PiecePosition>((_, index) => ({
            i: columnIndex + index,
            j: cellIndex + index
          }));
          break;
        }
      }
    }
  }
  return winningSeq;
};

/**
 * Check for left-to-right diagonal winning sequence
 *
 *  [-][-][-][x][x][x][x]
 *  [-][-][x][x][x][x][x]
 *  [-][x][x][x][x][x][x]
 *  [x][x][x][x][x][x][-]
 *  [x][x][x][x][x][-][-]
 *  [x][x][x][x][-][-][-]
 *
 * @param board Board
 * @return Array<PiecePosition>
 */
export const checkDiagonalRightToLeft = (board: Board): Array<PiecePosition> => {
  let winningSeq = null;

  for (const [ columnIndex, column ] of iterableEntries(board)) {

    if (winningSeq && winningSeq.length === WINNING_SEQ_COUNT) {
      break;
    }

    for (const [ cellIndex, cell ] of iterableEntries(column, true)) {
      const checkValue = cell;
      const maxReachCell = getMaxReachCell(board, columnIndex, cellIndex , -1);
      // fourth cell is out of reach (does not exist) or is different than value being checked
      if (!maxReachCell || checkValue !== maxReachCell) {
        continue;
      } else {
        const diagonal = extractDiagonal(board, columnIndex, cellIndex , -1);
        if (diagonal.every(value => value === checkValue)) {
          winningSeq = diagonal.map<PiecePosition>((_, index) => ({
            i: columnIndex + index,
            j: cellIndex - index
          }));
          break;
        }
      }
    }
  }
  return winningSeq;
};

/**
 * Check for horizontal winning sequence
 * @param  board Board
 */
export const checkHorizontal = (board: Board): Array<PiecePosition> => {
  const horizontalSeq = transpose(board)
    .map((row, rowIndex) => checkLine(row, rowIndex))
    .find(seq => !!seq);

  if (!horizontalSeq) {
    return null;
  }

  return horizontalSeq.map(({ i, j }) => ({ i: j, j: i})); // revert indexes
};

/**
 * Check line (array) for four-long winning sequence
 * @param line Line to check for sequence
 * @return Winning sequence (if present) in the format [..., { i, j } ,...]
 */
export const checkLine = (line: Array<string>, boardIndex: number): Array<PiecePosition> => {
  let checkValue;
  const winningSeq = line.reduce((acc, curValue, curIndex) => {
    // sequence is empty
    if (!acc.length) {
      checkValue = curValue;
      return [ ...acc, curIndex ];
    }

    if (acc.length < WINNING_SEQ_COUNT) {
      if (curValue === checkValue) {
        acc.push(curIndex);
      } else {
        // piece is different from ones in sequence => reset
        acc = [ curIndex ];
        checkValue = curValue;
      }
    }

    return acc;
  }, []);

  if (winningSeq.length === WINNING_SEQ_COUNT) {
    return winningSeq.map<PiecePosition>(j => ({
        i: boardIndex,
        j
      })
    );
  }

  return null;
};

/****** Helpers ******/

/**
 * Transpose matrix
 * [x][x][x] => [x][y][x]
 * [y][y][y]    [x][y][x]
 * [x][x][x]    [x][y][x]
 *
 * Filters out dead values
 *
 * @param  matrix Array<Array<string>>
 * @return Array<Array<string>> transposed matrix
 */
const transpose = matrix =>
  getTallestColumn(matrix)
    .map((_, i) =>
      matrix
        .map(y => y[i])
        .filter(val => !!val)
      );

/**
 * Get tallest column in a matrix
 * @param  matrix <Array<Array<string>>
 * @return column <Array<string>>
 */
const getTallestColumn = matrix => matrix.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);

/**
 * Get last cell in a possible diagonal winning four sequence
 * @param  board  Board
 * @param  startColumnIndex start-from cell [i] column index
 * @param  startColumnIndex start-from cell [j] cell(row) index
 * @param  alpha controls left-to-right or right-to-left
 * @return cell string
 */
const getMaxReachCell = (board, startColumnIndex, startCellIndex, alpha = 1) => {
  let cell = null;
  const column = board[startColumnIndex + WINNING_SEQ_COUNT - 1];

  if (column ) {
    cell = column[startCellIndex + (WINNING_SEQ_COUNT * alpha ) - (1 * alpha)];
  }

  return cell;
};

/**
 * Extract four cell long diagonal from matrix
 * @param  board Board
 * @param  startColumnIndex start-from cell [i] column index
 * @param  startColumnIndex start-from cell [j] cell(row) index
 * @return ret Array<string>
 */
const extractDiagonal = (board, startColumnIndex, startCellIndex, alpha = 1) => {
  const ret = [];

  for (let i = 0; i < WINNING_SEQ_COUNT; i ++) {
    ret.push(board[startColumnIndex + i][startCellIndex + (i * alpha)]);
  }

  return ret;
};

/**
 * Get iterable array of array.entries()
 */
const iterableEntries = (arr: Array<any>, reverse: boolean = false) => {
  const iterable = Array.from(arr.entries());
  if (reverse) {
    iterable.reverse();
  }

  return iterable;
};
