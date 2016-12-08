import _ from 'underscore';
import GameBoard from './src/GameBoard';
import { companyNames } from './src/GameBoard'; 
import Player from './src/Player';
import init from './src/Initialize';

init();
let board = new GameBoard();

/**
 * Test for all neighbors.
 * 
 * Should use asserts to verify corners, values on the edges, and a few values in the middle of the board
 */
// _.each(board.chips, chipId => {
//     console.log(chipId + ': ' + board.getNeighbors(chipId));
// });


/**
 * Test for isChipDead
 */
// let towers = board.getCompanyByName('Towers');
// _.each(['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A'], chipToAdd => { towers.addChip(chipToAdd) })
// let luxor = board.getCompanyByName('Luxor');
// _.each(['1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', '11C'], chipToAdd => { luxor.addChip(chipToAdd) });
// console.log(board.isChipDead('1B')); 
// console.log(board.isChipDead('12I'));


let brian = new Player(1, 'Brian');
console.log("--------Initialize");
console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
console.log('Cash:' + brian.cash)

brian.addStock(companyNames.Towers, 1);
brian.addStock(companyNames.Towers, 3);
brian.addStock(companyNames.Luxor, 3);
brian.addStock(companyNames.Towers, 3);

console.log("--------Before transaction");
console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
console.log('Cash:' + brian.cash)

brian.sellStock(companyNames.Towers, 4, 200);

console.log("--------After transaction");
console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
console.log('Cash:' + brian.cash);