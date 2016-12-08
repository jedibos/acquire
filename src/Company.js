import _ from 'underscore';

export default class Company {
    constructor(pName, pColor, pLevel) {
        this.name = pName;
        this.color = pColor;
        this.level = pLevel;

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
    
   isPermenant() {
        return this.companyChips.length >= 11;
   }
   containsChip(chipId) {
      return _.includes(this.companyChips, chipId); 
   }

   addChip(chipId) {
      this.companyChips.push(chipId);
   }
}