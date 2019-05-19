"use strict";
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
// var inputs = readline().split(' ');
const W = 7;
const H = 7;
let level = [['A', ' ', ' ', 'B', ' ', ' ', 'C'],
    ['|', ' ', ' ', '|', ' ', ' ', '|'],
    ['|', '-', '-', '|', ' ', ' ', '|'],
    ['|', ' ', ' ', '|', '-', '-', '|'],
    ['|', ' ', ' ', '|', '-', '-', '|'],
    ['|', ' ', ' ', '|', ' ', ' ', '|'],
    ['1', ' ', ' ', '2', ' ', ' ', '3']];
// for (let i = 0; i < H; i++) {
// const line = readline();
// console.error(line);
// level.push(line.split(''));
// }
//console.error(level);
// width / height
// console.error(level[0][3]);
function performMove(widthIndex, heightIndex) {
    // heightIndex 
    // widthIndex
    if (heightIndex == H - 1) {
        console.log(level[widthIndex][heightIndex]);
        return;
    }
    else if (heightIndex === 0) {
        performMove(widthIndex, heightIndex + 1);
    }
    if (widthIndex > 0 && level[widthIndex - 1][heightIndex] == '-') {
        performMove(widthIndex - 3, heightIndex + 1);
    }
    if (widthIndex + 1 < W && level[widthIndex + 1][heightIndex] == '-') {
        performMove(widthIndex + 3, heightIndex + 1);
    }
    else {
        performMove(widthIndex, heightIndex + 1);
    }
}
performMove(0, 0);
// Write an action using console.log()
// To debug: console.error('Debug messages...');
//console.log('answer');
