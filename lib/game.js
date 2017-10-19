import { Board } from './board';

export class Game {
  //Game class to be called to play a game
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    //constructor that will initialize an instance of the Board class
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //initialize board with row size, column size and number of bombs
  }

  playMove(rowIndex, columnIndex) {
    //Game class method playMove that will be the users move
    this._board.flipTile(rowIndex, columnIndex); //user provides co-ordinates for tile flip
    if (this._board.playerBoard[rowIndex][columnIndex] == 'B ') {
      //check user selection for a bomb, if there is a bomb log game over
      console.log("Game Over");
      console.log(this._board.print()); //print the players board
    } else if (!this._board.hasSafeTiles()) {
      //if all the safe tiles (non-bomb tiles) are flipped, user wins
      console.log('User Wins!');
    } else {
      console.log('Current Board: \n' + this._board.print()); //else continue game and print the player's current board
    }
  }
}