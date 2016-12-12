import _ from 'underscore';
import GameBoard from '../client/game/GameBoard';
import CompanyNames from '../client/game/CompanyNames';
import CompanyManager from '../client/game/CompanyManager'; 
import Player from '../client/game/Player';

/**
 * Test for all neighbors. Verifies corners, edges, and chips in the middle of the board.
 */
it('check various neighbor cases', () => {
    let board = new GameBoard({companyManager: new CompanyManager()});

    expect(board.getNeighborIds('1A')).toEqual(['1B', '2A']);
    expect(board.getNeighborIds('12A')).toEqual(['12B', '11A']);
});

/**
 * Test for isChipDead
 */
it ('verify merger between two permanent companies is described as dead', () => {
    let companyManager = new CompanyManager();
    let board = new GameBoard({companyManager});

    let towers = companyManager.getCompanyByName('Towers');
    _.each(['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A'], chipToAdd => { towers.addChip(chipToAdd) })

    let luxor = companyManager.getCompanyByName('Luxor');
    _.each(['1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', '11C'], chipToAdd => { luxor.addChip(chipToAdd) });

    expect(board.isChipDead('1B')).toBeTruthy(); 
    expect(board.isChipDead('11D')).toBeFalsy();
})

/**
 * Test case to verify that the find connected works properly.
 */
it('verify placing a chip with other ', () => {
    let companyManager = new CompanyManager();
    let board = new GameBoard({companyManager});

    _.each(['1B', '2B', '2C'], chipId => { board.placeChip(chipId )} );
    board.placeChipAndStartCompany(new Player({id: 1, name:'Brian'}), '2D', CompanyNames.Luxor);
    let luxor = companyManager.getCompanyByName(CompanyNames.Luxor);

    expect(luxor.companyChips).toEqual(['2D', '2C', '2B', '1B']);
});

/**
 * Test case to show purchasing and selling stocks.
 */
// let brian = new Player({id: 1, name: 'Brian'});
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