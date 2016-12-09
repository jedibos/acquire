import _ from 'underscore';
import Company from './Company';
import CompanyNames from './CompanyNames';

export default class CompanyManager {
    constructor() {
        this.companies = [
            new Company(CompanyNames.Luxor), 
            new Company(CompanyNames.Towers),
            new Company(CompanyNames.American),  
            new Company(CompanyNames.Worldwide),  
            new Company(CompanyNames.Festival),  
            new Company(CompanyNames.Imperial),  
            new Company(CompanyNames.Contential)]; 
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
        return _.find(this.companies, company => { return company.name == name });
    }
}