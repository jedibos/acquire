import _ from 'underscore';
import GameBoard from '../client/game/GameBoard';
import CompanyNames from '../client/game/CompanyNames';
import CompanyManager from '../client/game/CompanyManager'; 
import Player from '../client/game/Player';
import PlacementEffect from '../client/game/PlacementEffect';

/**
 * Test for all neighbors. Verifies corners, edges, and chips in the middle of the board.
 */
it('check various neighbor cases', () => {
    let board = new GameBoard();
    expect(board.getNeighborIds('1A')).toEqual(['2A', '1B']);
    expect(board.getNeighborIds('12A')).toEqual(['11A', '12B']);
    expect(board.getNeighborIds('1I')).toEqual(['2I', '1H']);
    expect(board.getNeighborIds('12I')).toEqual(['11I', '12H']);
    expect(board.getNeighborIds('5F')).toEqual(['6F', '4F', '5G', '5E'])
});

/**
 * Test for isChipDead. Generates two companies 
 */
it ('verify merger between two permanent companies is described as dead', () => {
    let board = new GameBoard()
    loadCompanyChips(board, CompanyNames.Towers, ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A'])
    loadCompanyChips(board, CompanyNames.Luxor, ['1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', '11C'])

    expect(board.isChipDead('1B')).toBeTruthy(); 
    expect(board.isChipDead('11B')).toBeTruthy();
    expect(board.isChipDead('11D')).toBeFalsy();
    expect(board.isChipDead('12A')).toBeFalsy();
})

/**
 * Test case to verify that the find connected works properly.
 */
it('verify placing a chip next to another to form a company', () => {
    let board = new GameBoard();
    _.each(['1B', '2B', '2C'], chipId => { board.placeChip(chipId)});
    board.placeChipAndStartCompany(new Player({id: 1, name:'Brian'}), '2D', CompanyNames.Luxor);
    let luxor = board.getCompanyManager().getCompanyByName(CompanyNames.Luxor);

    expect(luxor.companyChips).toEqual(['2D', '2C', '2B', '1B']);
});

/**
 * Test case to verify that placing two chips next to each other will cause a merge.
 */
it('verify placement causes companies to merge', () => {
    let board = new GameBoard();
    _.each(['9D', '7E'], chipId => { board.placeChip(chipId)});
    board.placeChipAndStartCompany(new Player({}), '8E', CompanyNames.Luxor);
    board.placeChipAndStartCompany(new Player({}), '10D', CompanyNames.Towers);

    expect(board.determineChipPlacementEffect('8D')).toEqual(PlacementEffect.MERGE);
})



/**
 * Convenience method to add a series of chips to a company for testing scenarios. 
 * @param board the game board
 * @param companyName name of the company to which chips should be added
 * @param chips the chips to add to the company
 */
function loadCompanyChips(board, companyName, chips) {
    let company = board.getCompanyByName(companyName)
    _.each(chips, chip => { company.addChip(chip) })
}

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