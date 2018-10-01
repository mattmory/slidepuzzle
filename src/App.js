import React, { Component } from 'react';

import './App.css';

import Tile from "./components/Tile";
import puzzle from "./puzzle.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle,
      modal: false,
      isSolved: true,
      gameInPlay: false
    }
  }

  // Get the game started
  shuffle = () => {
    let tempPuzzle = [...this.state.puzzle];
    for (let i = 0; i < tempPuzzle.length; i++) {
      tempPuzzle[i].sortOrder = Math.floor(Math.random() * 100) + 1
    }
    tempPuzzle.sort(function (a, b) { return a.sortOrder - b.sortOrder })
    for (let i = 0; i < tempPuzzle.length; i++) {
      tempPuzzle[i].sortOrder = i + 1;
      if (tempPuzzle[i].sortOrder === tempPuzzle[i].id) {
        tempPuzzle[i].correctSpot = true
      }
      else {
        tempPuzzle[i].correctSpot = false;
      }
    }
    // let isSolved = this.isGameSolved(tempPuzzle);
    this.setState(
      {
        isSolved: this.isGameSolved(tempPuzzle),
        puzzle: tempPuzzle,
        gameInPlay: true
      }
    );
  }

  // Get the Blank Spot
  getBlankSpot = () => {
    let blankSpot;
    for (let i = 0; i < this.state.puzzle.length; i++) {
      if (this.state.puzzle[i].id === "blank") {
        blankSpot = i;
      }
    }
    return blankSpot;
  }

  // Move the piece
  movePiece = (pieceSpot) => {
    if (this.state.isSolved) {
      return;
    }
    let blankSpot = this.getBlankSpot();
    let newPuzzle = [...this.state.puzzle];
    // Determine if the move is possible.
    // Figure out the row of the source/destination
    let sourceRow = Math.floor((pieceSpot) / 3) + 1;
    let sourceCol = ((pieceSpot) % 3) + 1;
    let blankRow = Math.floor((blankSpot) / 3) + 1;
    let blankCol = ((blankSpot) % 3) + 1;
    // See if the move isn valid, return if not.
    if (Math.abs(sourceRow - blankRow) + Math.abs(sourceCol - blankCol) !== 1) {
      return;
    }


    //Move Piece
    newPuzzle[pieceSpot] = this.state.puzzle[blankSpot];
    newPuzzle[blankSpot] = this.state.puzzle[pieceSpot];
    for (let i = 0; i < newPuzzle.length; i++) {
      newPuzzle[i].sortOrder = i + 1;
      if (newPuzzle[i].sortOrder === newPuzzle[i].id) {
        newPuzzle[i].correctSpot = true
      }
      else {
        newPuzzle[i].correctSpot = false;
      }
    }
    this.setState(
      {
        puzzle: newPuzzle,
        isSolved: this.isGameSolved(newPuzzle),
        gameInPlay: !this.isGameSolved(newPuzzle)
      });
  }

  // Check Solve
  isGameSolved = (game) => {
    let isSolved = true;
    for (let i = 0; i < game.length; i++) {
      if (game[i].id !== "blank" && game[i].correctSpot === false) {
        isSolved = false;
        i = game.length + 1;
      }
    }
    return isSolved;
  }

  render() {
    return (
      <div className="App">
        <div><br /></div>
        <div className="App-gameSquare">
        {this.state.gameInPlay ? 
        (
          this.state.puzzle.map((tile, index) =>
            <Tile
              tile={tile}
              key={tile.id}
              click={() => this.movePiece(index)}
              classId={index + 1}
            />
          ))
          :
          (<div><img className="App-fullImg" src="./images/tricycle.jpg" alt="tricycle"/></div>)}
        </div>
        <div>
          <br />
          <button onClick={this.shuffle}>{this.state.isSolved ? "Start Game" : "Reset"}</button>
        </div>
      </div>
    );
  }
}

export default App;
