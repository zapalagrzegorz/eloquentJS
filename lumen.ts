/* eslint lines-around-comment: ["error", { "beforeBlockComment": true }] */

// d = Math.max(Math.abs(candles[ci].i - i), Math.abs(candles[ci].j - j))
// if (d<L)
// x1 = 1, y1 = 1;
// x0 = 0; y0 = 0;

//  1-0 + 1-0

// 3, 3
// 1, 1

// 3-1, 3-1 -> 2, 2
// 3-1, 2-1

const N = 5;
const maxLengthLight = 3;

const grid: (string | number)[][] = [
  ['X', 'X', 'X', 'X', 'X'],
  ['X', 'C', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X'],
];

// let grid =
// [...Array(N)]
// .map(readline)
// .map( lineOfRoom =>  lineOfRoom.replace(/\s/g, ''));

type Candle = {
  row: number;
  index: number;
};

const candles: Candle[] = [];

/* abc */
for (let heightIndex = 0; heightIndex < N; heightIndex++) {
  for (let widthIndex = 0; widthIndex < N; widthIndex++) {
    if (grid[heightIndex][widthIndex] == 'C') {
      const candle: Candle = { row: 0, index: 0 };
      candle.row = heightIndex;
      candle.index = widthIndex;
      candles.push(candle);
    }
  }
}

/**
 * Checks whether given tile of 2D array is within light range
 * @param candle
 * @param indexRow
 * @param indexHeight
 */
const checkIsInLight = (candle: Candle, indexRow: number, indexHeight: number) => {
  const distance = Math.max(Math.abs(candle.row - indexRow), Math.abs(candle.index - indexHeight));
  if (distance < maxLengthLight) {
    return true;
  }
  return false;
};

/**
 * Reduce callback function to calculate number of dark tiles in 2D array
 * @param totalTilesInDark
 * @param row
 * @param indexHeight
 */
const calculateTilesInDark = function (
  totalTilesInDark: number,
  row: (string | number)[],
  indexHeight: number,
) {

  /**
   * Inner helper function callback to reduce single row to a number of dark tiles
   * @param tilesInDarkInRow
   * @param element
   * @param indexRow
   */
  function calculateTilesInDarkInRow(
    tilesInDarkInRow: number,
    element: string | number,
    indexRow: number,
  ) {
    const isItInDark = !candles.some(candle => checkIsInLight(candle, indexRow, indexHeight));

    if (isItInDark) {
      return (tilesInDarkInRow += 1);
    }
    return tilesInDarkInRow;
  }

  return (totalTilesInDark += row.reduce(calculateTilesInDarkInRow, 0));
};

console.log(grid.reduce(calculateTilesInDark, 0));
