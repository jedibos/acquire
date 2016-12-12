import _ from 'underscore';

export default class Player {
    constructor(pState) {
        this.id = pState.id;
        this.name = pState.name;

        //players start out with 4 1000s, 3 500s, and 5 100s
        this.cash = pState.cast || 4000 + 1500 + 500;

        this.stocks = pState.stocks || {};
    }

    purchaseStock(companyName, numberOfStocks, valuePerStock) {
        this.addStock(companyName, numberOfStocks);
        this.cash -= (numberOfStocks * valuePerStock);
    }

    sellStock(companyName, numberOfStocks, valuePerStock) {
        let existingStocks = this.getNumberOfStocks(companyName);
        this.stocks[companyName] = existingStocks - numberOfStocks;
        this.cash += (numberOfStocks * valuePerStock);
    }

    /**
     * Adds stock to a player, does not affect money. Used internally alongside the money
     * transactions, when opening a company, and when trading stocks.
     */
    addStock(companyName, numberOfStocks) {
        let existingStocks = this.getNumberOfStocks(companyName); 
        this.stocks[companyName] = (existingStocks | 0) + numberOfStocks;
    }

    getAllStocks() {
        return this.stocks;
    }

    getNumberOfStocks(companyName) {
        return this.stocks[companyName];
    }
}