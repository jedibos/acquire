import _ from 'underscore';
import Company from './Company';

export const COMPANY_NAMES = {
    Luxor: 'Luxor',
    Towers: 'Towers',
    American: 'American',
    Worldwide: 'Worldwide',
    Festival: 'Festival',
    Imperial: 'Imperial',
    Contential: 'Contential'
}
export const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
export const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

export default class GameBoard {
    constructor() {
        this.chips = _.combine(rows, columns).map(val => { return val[0] + val[1] });

        this.companies = [
            new Company(COMPANY_NAMES.Luxor), 
            new Company(COMPANY_NAMES.Towers),
            new Company(COMPANY_NAMES.American),  
            new Company(COMPANY_NAMES.Worldwide),  
            new Company(COMPANY_NAMES.Festival),  
            new Company(COMPANY_NAMES.Imperial),  
            new Company(COMPANY_NAMES.Contential)]; 
    }

    /**
     * Retrieves the company associated with a particular chip.
     */
    getCompanyByChipId(chipId) {
        return _.find(this.companies, company => { return company.containsChip(chipId) });
    }

    /**
     * Retrieves the company by name.
     */
    getCompanyByName(name) {
        return _.find(this.companies, company => { return company.name == name });
    }

    /**
     * Determines if the chip is dead and should be removed from play. A chip cannot be played if it would
     * connect two permanent companies, which are companies with 11 or more chips.
     */
    isChipDead(chipId) {
        //get all the companies next to this chip
        let companies = _.compact(
            this.getNeighbors(chipId).map(neighbor => { return this.getCompanyByChipId(neighbor) })
        );

        //remove duplicates (uniq) and filter only permanent companies
        let permanentCompanies = _.filter(_.uniq(companies), company => { return company.isPermenant() });

        //cannot be more than one permanent company next to this chip
        return permanentCompanies.length > 1;
    }

    /**
     * Find all the chips adjacent to a particular chip. The chips on the sides and corners may not have all
     * four, so compact removes those null values. 
     */
    getNeighbors(chipId) {
        return _.compact([
            this.getRightNeighborId(chipId),  this.getLeftNeighborId(chipId),
            this.getBottomNeighborId(chipId), this.getTopNeighborId(chipId)]);
    }

    /**
     * The adjacent chip under the identified chip.
     */
    getBottomNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex + 1 < rows.length ? rows[rowIndex + 1] + col : null;
    }

    /**
     * The adjacent chip above the identified chip.
     */
    getTopNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex > 0 ? rows[rowIndex - 1] + col : null;
    }

    /**
     * The adjacent chip to the right of the identified chip.
     */
    getRightNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex + 1 < columns.length ? row + columns[colIndex + 1] : null;
    }

    /**
     * The adjacent chip to the left of the identified chip.
     */
    getLeftNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex > 0 ? row + columns[colIndex - 1] : null;
    }

    /**
     * Breaks up the chipId into the identifies for the row (1-12) and column (A-I).
     */
    getRowAndColumn(id) {
        return {row: id.slice(0, -1), col: id.slice(-1)}
    }
}