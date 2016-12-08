import _ from 'underscore';
import Company from './Company';

export const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
export const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

export default class GameBoard {
    constructor() {
        this.chips = _.combine(rows, columns).map(val => { return val[0] + val[1] });

        this.companies = [
            new Company('Luxor'), 
            new Company('Towers'),
            new Company('American'),  
            new Company('Worldwide'),  
            new Company('Festival'),  
            new Company('Imperial'),  
            new Company('Contential')]; 
    }

    getCompanyByChipId(chipId) {
        return _.find(this.companies, company => { return company.containsChip(chipId) });
    }

    getCompanyByName(name) {
        return _.find(this.companies, company => { return company.name == name });
    }

    isChipDead(chipId) {
        let companies = _.uniq(_.compact(
            this.getNeighbors(chipId).map(neighbor => {
                return this.getCompanyByChipId(neighbor)
            }))
        );
        let permanentCompanies = _.filter(companies, company => { return company.isPermenant() });
        return permanentCompanies.length > 1;
    }

    getNeighbors(id) {
        return _.compact([
            this.getRightNeighborId(id), 
            this.getLeftNeighborId(id),
            this.getBottomNeighborId(id),
            this.getTopNeighborId(id)]);
    }

    getBottomNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex + 1 < rows.length ? rows[rowIndex + 1] + col : null;
    }

    getTopNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex > 0 ? rows[rowIndex - 1] + col : null;
    }

    getRightNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex + 1 < columns.length ? row + columns[colIndex + 1] : null;
    }

    getLeftNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex > 0 ? row + columns[colIndex - 1] : null;
    }

    getRowAndColumn(id) {
        return {row: id.slice(0, -1), col: id.slice(-1)}
    }
}