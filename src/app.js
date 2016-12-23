import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './client/game/GameBoard';
import GameBoardView from './GameBoardView';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameBoard: new GameBoard()
    }
    this.placeChipOnBoard = this.placeChipOnBoard.bind(this);
  }

  render() {
    return (
      <div className="App">
        <GameBoardView gameBoard={this.state.gameBoard} placeChipOnBoard={this.placeChipOnBoard} />
      </div>
    );
  }

  placeChipOnBoard(chipId, event) {
    this.state.gameBoard.placeChip(chipId);
    this.setState({gameBoard: this.state.gameBoard});
  }
}
export default App;