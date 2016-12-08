import _ from 'underscore';
import { companyNames } from './GameBoard';

export default class Player {
    constructor(pId, pName) {
        this.id = pId;
        this.name = pName;

        //players start out with 4 1000s, 3 500s, and 5 100s
        this.cash = 4000 + 1500 + 500;

        this.stocks = {};
    }

    addStock(companyName, numberOfStocks) {
        let existingStocks = this.getNumberOfStocks(companyName); 
        this.stocks[companyName] = (existingStocks | 0) + numberOfStocks;
    }

    sellStock(companyName, numberOfStocks, valuePerStock) {
        let existingStocks = this.getNumberOfStocks(companyName);
        this.stocks[companyName] = existingStocks - numberOfStocks;
        this.cash += (numberOfStocks * valuePerStock);
    }

    getAllStocks() {
        return this.stocks;
    }

    getNumberOfStocks(companyName) {
        return this.stocks[companyName];
    }
}