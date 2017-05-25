import _ from 'underscore';
import Company from './Company';
import CompanyNames from './CompanyNames';

export default class CompanyManager {
    constructor() {
        this.companies = [
            new Company({name: CompanyNames.Luxor}), 
            new Company({name: CompanyNames.Towers}),
            new Company({name: CompanyNames.American}),  
            new Company({name: CompanyNames.Worldwide}),  
            new Company({name: CompanyNames.Festival}),  
            new Company({name: CompanyNames.Imperial}),  
            new Company({name: CompanyNames.Contential})]; 
    }

    /**
     * Retrieves companies that are avaialble to open.
     */
    getAllUnopenedCompanies() {
        return _.find(this.companies, company => { return company.isClosed() });
    }

    /**
     * Retrieves opened companies.
     */
    getAllOpenedCompanies() {
        return _.find(this.companies, company => { return company.isOpen() });
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
        return _.find(this.companies, company => { return company.name === name });
    }

    debug() {
        _.each(this.companies, company => { company.debug() })
    }
}