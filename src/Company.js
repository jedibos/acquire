import _ from 'underscore';
import CompanyStatus from './CompanyStatus';

/**
 * Company.
 * 
 * <p>
 * Keeps track of the state of a company as chips are added, merges occur and stocks
 * are purchased or sold.
 */
export default class Company {
    constructor(pName, pColor, pLevel) {
        this.name = pName;
        this.color = pColor;
        this.level = pLevel;
        this.status = CompanyStatus.CLOSED;

        //cost of the stock, initially based on the 
        this.stockCost = 0;

        //contains the ids of all chips that are part of this company
        this.companyChips = [];

        //the number of stocks available for the company, initially 25
        this.availableStocks = 25;
    }

    /**
     * Opens up this company.
     */
    openCompany(player, includedChips) {
        this.companyChips = includedChips;

        //initialize the stock cost based on the company type
        switch (this.level) {
            case 1: this.stockCost = 200; break;
            case 2: this.stockCost = 300; break;
            case 3: this.stockCost = 400; break;
        }

        //increase the stock cost based on the company size
        this.stockCost += (this.getCompanySizeCostFactor() * 100);

        if (this.availableStocks > 0) {
            player.addStock(this.name, 1);
            this.availableStocks--;
        }
    }   

    /**
     * The size of the company determines the additional cost for each stock.
     */
    getCompanySizeCostFactor() {
        let cs = this.getSize();
        switch(true) {
            case (cs == 2):             return 0;
            case (cs == 3):             return 1;
            case (cs == 4):             return 2;
            case (cs == 5):             return 3;
            case (cs > 6  && cs <= 10): return 4;
            case (cs > 10 && cs <= 20): return 5;
            case (cs > 20 && cs <= 30): return 6;
            case (cs > 30 && cs <= 40): return 7;
            case (cs > 40):             return 8;
        }
    }

    /**
     * Determines if the company is open and stocks can be purchased.
     */
    isOpen() {
        return this.status == CompanyStatus.OPEN;
    }

    /**
     * Returns true if the company has 11 or more chips, indicating that it can no longer be
     * merged into a larger company.
     */
    isPermenant() {
        return this.companyChips.length >= 11;
    }

    /**
     * Checks to see if this company 
     */
    containsChip(chipId) {
        return _.includes(this.companyChips, chipId); 
    }

    /**
     * Adds a chip as a part of the company.
     */
    addChip(chipId) {
        this.companyChips.push(chipId);
    }

    getSize() {
        return this.companyChips.length;
    }
}