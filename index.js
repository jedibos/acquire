import _ from 'underscore';
import GameBoard from './src/client/game/GameBoard';
import CompanyNames from './src/client/game/CompanyNames';
import CompanyManager from './src/client/game/CompanyManager'; 
import Player from './src/client/game/Player';
import init from './src/client/game/Initialize';

init();
let companyManager = new CompanyManager();
let board = new GameBoard(companyManager);

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


/**
 * Test case to show purchasing and selling stocks.
 */
// let brian = new Player(1, 'Brian');
// console.log("--------Initialize");
// console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
// console.log('Cash:' + brian.cash)

// brian.addStock(CompanyNames.Towers, 1);
// brian.purchaseStock(CompanyNames.Towers, 3, 200);
// brian.purchaseStock(CompanyNames.Luxor, 3, 400);
// brian.purchaseStock(CompanyNames.Towers, 3, 400);

// console.log("--------Before transaction");
// console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
// console.log('Cash:' + brian.cash)

// brian.sellStock(CompanyNames.Towers, 4, 200);

// console.log("--------After transaction");
// console.log("Stocks: "+ JSON.stringify(brian.getAllStocks()));
// console.log('Cash:' + brian.cash);


/**
 * Test case to verify that the find connected works properly.
 */
_.each(['2A', '2B', '2C'], chipId => { board.placeChip(chipId )} );
board.placeChipAndStartCompany(new Player('Brian'), '2D', CompanyNames.Luxor);
let luxor = companyManager.getCompanyByName(CompanyNames.Luxor);
console.log(luxor.companyChips);
