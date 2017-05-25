import React, { Component } from 'react';
import './App.css';
import GameBoard from './client/game/GameBoard';
import PlacementEffect from './client/game/PlacementEffect';

import GameBoardView from './GameBoardView';
import CompanyCreationOptions from './CompanyCreationOptions';

class App extends Component {
  constructor() {
    super();

    //state management
    this.state = {
      addingCompany: false,
      currentChipId: '',
      selectedCompanyToCreate: '',
      gameBoard: new GameBoard()
    }
    this.gameBoard = this.state.gameBoard;

    //event bindings
    this.placeChipOnBoard = this.placeChipOnBoard.bind(this);
    this.createCompany = this.createCompany.bind(this);
    this.selectCompanyToCreate = this.selectCompanyToCreate.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-8">
            <GameBoardView gameBoard={this.gameBoard} placeChipOnBoard={this.placeChipOnBoard} />
          </div>
          <div className="col-md-4">
            <CompanyCreationOptions addingCompany={this.state.addingCompany}
              chipId={this.state.currentChipId}
              gameBoard={this.state.gameBoard}
              createCompany={this.createCompany}
              selectedCompany={this.state.selectedCompanyToCreate}
              selectCompanyToCreate={this.selectCompanyToCreate} />
          </div>
        </div>
      </div>
    );
  }

  placeChipOnBoard(chipId) {
    let placementEffect = this.gameBoard.determineChipPlacementEffect(chipId);
    if (placementEffect === PlacementEffect.NO_AFFECT) {
      this.gameBoard.placeChip(chipId);
      this.setState({gameBoard: this.gameBoard});

    } else {
      this.setState({addingCompany: true, currentChipId: chipId});
    }
  }

  selectCompanyToCreate(companyName) {
    this.setState({selectedCompanyToCreate: companyName});
  }

  createCompany(data) {
    this.gameBoard.placeChipAndStartCompany(data.player, data.chipId, data.companyName);
    this.setState({gameBoard: this.gameBoard, addingCompany: false});
  }
}
export default App;