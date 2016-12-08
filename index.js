import _ from 'underscore';
import GameBoard from './src/GameBoard';
import init from './src/Initialize';

init();
let board = new GameBoard();

//test for all neighbors
// _.each(board.chips, chipId => {
//     console.log(chipId + ': ' + board.getNeighbors(chipId));
// });


//Test for isChipDead
let towers = board.getCompanyByName('Towers');
_.each(['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A'], chipToAdd => { towers.addChip(chipToAdd) })
let luxor = board.getCompanyByName('Luxor');
_.each(['1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', '11C'], chipToAdd => { luxor.addChip(chipToAdd) });
console.log(board.isChipDead('1B'));

console.log(board.isChipDead('12I'));
