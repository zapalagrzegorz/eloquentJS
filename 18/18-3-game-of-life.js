"use strict";
// <div id="grid"></div>
// <button id="next">Next generation</button>
document.addEventListener('DOMContentLoaded', () => {
    const rows = 7;
    const columns = 8;
    const lifeCellValues = [];
    function init() {
        const grid = document.querySelector('#grid');
        if (!grid) {
            return;
        }
        const documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(document.createElement('p'));
        const parent = documentFragment.querySelector('p');
        if (!parent) {
            return;
        }
        // 7 na 8
        //
        for (let i = 0; i < rows; i++) {
            lifeCellValues.push([]);
            for (let j = 0; j < columns; j++) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.index = String(i) + String(j);
                checkbox.checked = Math.random() >= 0.5;
                parent.appendChild(checkbox);
                checkbox.addEventListener('change', function () {
                    if (!this.dataset.index) {
                        return;
                    }
                    const index = this.dataset.index.split('');
                    const row = Number(index[0]);
                    const column = Number(index[1]);
                    lifeCellValues[row][column] = this.checked;
                    console.log(lifeCellValues[row][column]);
                });
                lifeCellValues[i].push(checkbox.checked);
            }
            parent.appendChild(document.createElement('br'));
        }
        grid.appendChild(documentFragment);
    }
    function generate() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const lifeForm = lifeCellValues[i][j];
                // maxymalnie 8 sąsiadów
                // findNeighbours
                // 1, 1
                // -1 oraz + 1, -1, +1
                //
                const liveNeighbours = 0;
                if (lifeCellValues[i - 1] && lifeCellValues[i - 1][j]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i - 1] && lifeCellValues[i - 1][j - 1]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i][j - 1]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i + 1][j - 1]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i + 1][j]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i + 1][j + 1]) {
                    liveNeighbours + 1;
                }
                if (lifeCellValues[i][j + 1]) {
                    liveNeighbours + 1;
                }
                // undefined
                if (lifeCellValues[i - 1][j + 1]) {
                    liveNeighbours + 1;
                }
            }
        }
    }
    init();
    generate();
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
