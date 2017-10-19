export class Board {
  //Board class
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    //constructor method to initialize properties of board class
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns; //compute total tiles, used to determine if user wins
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns); //generate the board the player will use and see
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs); //generate same size board the player uses but populated with random bombs
  }

  get playerBoard() {
    //getter method for playerBoard
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    //method used to check a user's turn
    if (this._playerBoard[rowIndex][columnIndex] != '  ') {
      //check for a repeat turn
      console.log('This tile has been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
      //if the users choice is a bomb
      this._playerBoard[rowIndex][columnIndex] = 'B '; //store to the player's board that they have chosen a bomb
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex); //call method to determind surronding number of bombs
    }
    this._numberOfTiles--; //the player has used one of the total tiles
  }

  getNumberOfNeighbourBombs(rowIndex, columnIndex) {
    //find the bombs surrounding a users choice
    let neighbourOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; //array containing all adjacent squares to users choice
    const numberOfRows = this._bombBoard.length; //find amount of rows in bombBoard
    const numberOfColumns = this._bombBoard[0].length; //find amount of columns in bombBoard
    let adjacentBombs = 0; //declare count for surrounding bombs
    neighbourOffsets.forEach(offset => {
      //for each adjacent square
      const neighbourRowOffset = offset[0] + rowIndex;
      const neighbourColumnOffset = offset[1] + columnIndex;

      if (neighbourRowOffset >= 0 && neighbourRowOffset < numberOfRows && neighbourColumnOffset >= 0 && neighbourColumnOffset < numberOfColumns) {
        //if adjacent square is on the bombBoard
        if (this._bombBoard[neighbourRowOffset][neighbourColumnOffset] === 'B') {
          //check if it is a bomb
          //console.log('bomb at '+ neighbourRowOffset + '  ' + neighbourColumnOffset);
          adjacentBombs++; //increment count of surrounding bombs
        }
      }
    });
    return adjacentBombs; //return total count of surrounding bombs
  }
  hasSafeTiles() {
    //method to check if there are safe tiles remaining
    return this._numberOfTiles != this._numberOfBombs;
  }

  print() {
    //print a formatted player board
    let formattedBoard = this._playerBoard.map(row => row.join('|')).join('\n');
    return formattedBoard;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    //method to create board to hold player's guesses, specified number of rows and columns
    let board = []; //declare empty board array
    for (let i = 0; i < numberOfRows; i++) {
      //for loop to construct all the rows
      let row = []; //declare an empty row
      for (let j = 0; j < numberOfColumns; j++) {
        row.push('  '); //create a blank indice for each column in that row
      }
      board.push(row); //append each row to the board array
    }
    return board; //return the board
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    //method to create board to hold bombs, specified number of rows and columns, same structure as playerBoard
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0; //initialize count for number of bombs placed
    while (numberOfBombs != numberOfBombsPlaced) {
      //while there are still bombs to be placed...
      let randomRowIndex = Math.floor(Math.random() * numberOfRows); //select a random row index
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns); //select a random column index
      if (board[randomRowIndex][randomColumnIndex] != 'B') {
        //if this random index does not already have a bomb
        board[randomRowIndex][randomColumnIndex] = 'B'; //place a bomb there
        numberOfBombsPlaced++; //increase the count for the number of bombs placed
      }
    }
    return board; //return the bomb board
  }
}