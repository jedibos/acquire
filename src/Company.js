import _ from 'underscore';

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
        this.open = false;

        //initial cost for stock before company is expanded
        this.baseCost = pLevel;
        switch (this.level) {
            case 1: baseCost = 200;
            case 2: baseCost = 300;
            case 3: baseCost = 400;
        }

        //contains the ids of all chips that are part of this company
        this.companyChips = [];
    }

    /**
     * Determines if the company is open and stocks can be purchased.
     */
    isOpen() {
        return this.open;
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
}