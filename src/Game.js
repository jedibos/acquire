import GameBoard from './GameBoard';
import CompanyManager from '/.CompanyManager';

class Game {
    constructor() {
        this.compnanyManager = new CompnayManager();
        this.gameBoard = new GameBoard(companyManager);
    }
}