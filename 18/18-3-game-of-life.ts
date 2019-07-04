// <div id="grid"></div>
// <button id="next">Next generation</button>
document.addEventListener('DOMContentLoaded', () => {
  const rows = 7;
  const columns = 8;
  let lifeCellValues: Array<Array<boolean>> = [];

  const grid = document.querySelector<HTMLDivElement>('#grid');

  if (!grid) {
    return;
  }

  function createAndSetLifeMap(nextGenValues?: Array<Array<boolean>>) {

    /**
     *
     * Zwraca pole mapy z wartością ustawioną losowo, albo wartością z kolejnej generacji
     * @param  {Number} row       Indeks rzędu
     * @param  {Number} column    Indeks kolumny
     * @return {HTMLInputElement} Pole mapy
     */
    function getLifeField(row: number, column: number, nextGenValues?: Array<Array<boolean>>) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.index = String(row) + String(column);
      if (nextGenValues) {
        checkbox.checked = nextGenValues[row][column];
      } else {
        checkbox.checked = Math.random() >= 0.5;
      }
      return checkbox;
    }

    function updateDOM(DOMTarget : HTMLElement, DOMContent : DocumentFragment) {
      DOMTarget.innerHTML = '';
      DOMTarget.appendChild(DOMContent);
    }

    const documentFragment = document.createDocumentFragment();

    documentFragment.appendChild(document.createElement('p'));
    const parent = documentFragment.querySelector('p');

    if (!parent || !grid) {
      return;
    }

    // create values

    lifeCellValues = [];
    for (let i = 0; i < rows; i++) {
      lifeCellValues.push([]);
      for (let j = 0; j < columns; j++) {
        const checkbox = getLifeField(i, j, nextGenValues);

        parent.appendChild(checkbox);

        lifeCellValues[i].push(checkbox.checked);
      }
      parent.appendChild(document.createElement('br'));
    }

    updateDOM(grid, documentFragment);

  }

  function init() {
    createAndSetLifeMap();

    document.addEventListener('change', function (event) {
      const target = event.target as HTMLInputElement;

      if (!target.dataset) {
        return;
      }

      const index = (target as any).dataset.index.split('');
      const row = Number(index[0]);
      const column = Number(index[1]);
      lifeCellValues[row][column] = target.checked;
    });

    document.addEventListener('click', (event) => {
      if (!event.target) {
        return;
      }

      if ((event.target as HTMLElement).matches('#next')) {
        generate();
      }
    });
  }

  function generate() {
    const countLiveNeighbours = function (
      lifeCellValues: Array<Array<boolean>>,
      i: number,
      j: number,
    ) {
      let liveNeighbours = 0;

      if (lifeCellValues[i - 1]) {
        if (lifeCellValues[i - 1][j]) {
          liveNeighbours += 1;
        }
        if (lifeCellValues[i - 1][j - 1]) {
          liveNeighbours += 1;
        }
        // undefined
        if (lifeCellValues[i - 1][j + 1]) {
          liveNeighbours += 1;
        }
      }

      /* cells of higher row - bottom  */
      if (lifeCellValues[i + 1]) {
        if (lifeCellValues[i + 1][j - 1]) {
          liveNeighbours += 1;
        }

        if (lifeCellValues[i + 1][j]) {
          liveNeighbours += 1;
        }

        if (lifeCellValues[i + 1][j + 1]) {
          liveNeighbours += 1;
        }
      }

      /* to left and right */
      if (lifeCellValues[i][j - 1]) {
        liveNeighbours += 1;
      }

      if (lifeCellValues[i][j + 1]) {
        liveNeighbours += 1;
      }
      return liveNeighbours;
    };

    const updateCellValue = function () {};

    const lifeCellValuesNextGen: Array<Array<boolean>> = JSON.parse(JSON.stringify(lifeCellValues));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const liveNeighbours = countLiveNeighbours(lifeCellValues, i, j);

        if (liveNeighbours < 2 || liveNeighbours > 3) {
          lifeCellValuesNextGen[i][j] = false;
        }
        // zbędny warunek - wartość się nie zmienia
        if ((liveNeighbours === 2 || liveNeighbours === 3) && lifeCellValues[i][j]) {
          lifeCellValuesNextGen[i][j] = true;
        }

        if (liveNeighbours === 3 && !lifeCellValues[i][j]) {
          lifeCellValuesNextGen[i][j] = true;
        }
      }
    }
    createAndSetLifeMap(lifeCellValuesNextGen);

    // Any live cell with two or three live neighbors lives on to the next generation.

    // Any dead cell with exactly three live neighbors becomes a live cell.
  }

  init();
});

//   const distance = Math.max(Math.abs(candle.row - indexRow), Math.abs(candle.index - indexHeight));
// const run = document.querySelector<HTMLButtonElement>('#button');
// const output = document.querySelector<HTMLPreElement>('#output');

// if(!run || !output){
//     return;
// }

// run.addEventListener('click', function(){

//     const code = document.querySelector<HTMLTextAreaElement>('#code');
//     if(!code){
//         return;
//     }
//     try{
//         const result : string = Function(code.value)();
//         output.innerText = String(result);
//     }
//     catch(err){
//         output.innerText = "Error: " + err.message;
//     }
// });
// </script>
