import _ from 'underscore';
import PlacementEffect from './PlacementEffect';
import CompanyManager from './CompanyManager';
import CompanyStatus from './CompanyStatus';
import {rows, columns, allChips} from './Grid.js';

export default class GameBoard {
    constructor(pState) {
        pState = pState || {};
        this.companyManager = pState.companyManager || new CompanyManager();;
        this.chipPile = pState.chipPile || allChips.slice();
        this.chipsOnTheBoard = pState.chipsOnTheBoard || [];
    }

    /**
     * Determines the type of effect that placement of tile will have on the game board.
     */
    determineChipPlacementEffect(chipId) {
        let neighborChips = this.getNeighborChipsOnTheBoard(chipId);
        let neighborCompanies = this.getNeighborCompanies(chipId);

        switch (true) {
            case (neighborChips.length === 0):
                return PlacementEffect.NO_AFFECT;
            case (neighborCompanies.length === 1):
                return PlacementEffect.GROW_COMPANY;
            case (neighborChips.length > 0 && neighborCompanies.length === 0):
                return PlacementEffect.CREATE_COMPANY;
            default:
                return PlacementEffect.MERGE
        }
    }

    /**
     * Place a chip on the board, the assumption is made that no companies will
     * be formed or merged. If either of those effects need to take place, then
     * the other placeChip* methods should be invoked.
     */
    placeChip(chipId) {
        //if the chip causes a company to grow, then find the copmany and add to it
        let neighborCompanies = this.getNeighborCompanies(chipId);
        if (neighborCompanies.length === 1) {
            neighborCompanies[0].addChip(chipId);
        }
        this.chipsOnTheBoard.push(chipId);
    }

    placeChipAndStartCompany(player, chipId, newCompanyName) {
        //determine which chips will be part of the new company
        let chipsIncludedInOpener = this.getAllConnectedChipsOnBoard(chipId);
        let includedChips = _.union([chipId], chipsIncludedInOpener);

        //create the company and add the chips to it
        let company = this.companyManager.getCompanyByName(newCompanyName);
        company.openCompany(player, includedChips);
        this.chipsOnTheBoard.push(chipId);
    }

    /**
     * 
     */
    placeChipAndMergeCompanies(player, chipId) {
        let neighborCompanies = this.getNeighborCompanies(chipId);
        _.each(neighborCompanies, company => { company.status = CompanyStatus.MERGING });
        this.chipsOnTheBoard.push(chipId);
    }

    /**
     * Determines if the chip is present on the board, this is for chips that are not
     * part of a company.
     */
    isChipOnBoard(chipId) {
        return _.contains(this.chipsOnTheBoard, chipId);
    }

    /**
     * Get the company name for a particular chip.
     */
    getCompanyName(chipId) {
        let company = this.companyManager.getCompanyByChipId(chipId);
        return company ? company.name : '';
    }

    /**
     * Determines if the chip is dead and should be removed from play. A chip cannot be played if it would
     * connect two permanent companies, which are companies with 11 or more chips.
     */
    isChipDead(chipId) {
        //get all the companies next to this chip
        let companies = _.compact(
            this.getNeighborIds(chipId).map(neighbor => { return this.companyManager.getCompanyByChipId(neighbor) })
        );

        //remove duplicates (uniq) and filter only permanent companies
        let permanentCompanies = _.filter(_.uniq(companies), company => { return company.isPermenant() });

        //cannot be more than one permanent company next to this chip
        return permanentCompanies.length > 1;
    }

    /**
     * Chips that are either in a player's hand or in the chip pile.
     */
    getAllChipsNotOnTheBoard() {
        return _.difference(this.allChips, this.chipsOnTheBoard);
    }

    /**
     * Scans all the unplaced chips.
     */
    doAnyOpenersRemains() {
        _.filter(this.chipPile, chip => {
            return this.determineChipPlacementEffect() === PlacementEffect.CREATE_COMPANY
        }); 
    }

    /**
     * Find all the chips adjacent to a particular chip.
     */
    getNeighborIds(chipId) {
        return _.compact([
            this.getRightNeighborId(chipId),  this.getLeftNeighborId(chipId),
            this.getBottomNeighborId(chipId), this.getTopNeighborId(chipId)]);
    }

    /**
     * Placement of a chip can cause adjacent chips, and potentially the chips adjacent to
     * those chips since at the start of the game can have chips next to each other that are
     * not part of a company).
     */
    getAllConnectedChipsOnBoard(chipId, previouslyChecked) {
        previouslyChecked = previouslyChecked || [];

        let neighbors = this.getNeighborChipsOnTheBoard(chipId);
        let needToCheck = _.difference(neighbors, previouslyChecked);
        previouslyChecked = _.union(previouslyChecked, neighbors);

        _.each(needToCheck, check => {
            neighbors = _.union(neighbors, this.getAllConnectedChipsOnBoard(check, previouslyChecked))
        })
        return neighbors;
    }

    /**
     * Find all chips on the board, aka previously placed, adjacent to the chip id.
     */
    getNeighborChipsOnTheBoard(chipId) {
        return _.filter(this.getNeighborIds(chipId), neighborId => { return this.isChipOnBoard(neighborId) });
    }

    /**
     * Finds the companies that are next to a chip.
     */
    getNeighborCompanies(chipId, neighborChipIds) {
        neighborChipIds = neighborChipIds || this.getNeighborIds(chipId);
        return _.compact(
            neighborChipIds.map(neighbor => { return this.companyManager.getCompanyByChipId(neighbor) })
        );
    }

    /**
     * The adjacent chip under the identified chip.
     */
    getBottomNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex + 1 < rows.length ? col + rows[rowIndex + 1] : null;
    }

    /**
     * The adjacent chip above the identified chip.
     */
    getTopNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let rowIndex = rows.indexOf(row);
        return rowIndex > 0 ? col + rows[rowIndex - 1] : null;
    }

    /**
     * The adjacent chip to the right of the identified chip.
     */
    getRightNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex + 1 < columns.length ? columns[colIndex + 1] + row: null;
    }

    /**
     * The adjacent chip to the left of the identified chip.
     */
    getLeftNeighborId(chipId) {
        let {row, col} = this.getRowAndColumn(chipId);
        let colIndex = columns.indexOf(col);
        return colIndex > 0 ? columns[colIndex - 1] + row : null;
    }

    /**
     * Breaks up the chipId into the identifies for the row (1-12) and column (A-I).
     */
    getRowAndColumn(id) {
        return {col: id.slice(0, -1), row: id.slice(-1)}
    }

    getCompanyManager() {
        return this.companyManager;
    }

    getCompanyByName(companyName) {
        return this.companyManager.getCompanyByName(companyName);
    }
}