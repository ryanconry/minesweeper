'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  //board to hold player's guesses
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push('  ');
    }
    row.join('|');
    board.push(row);
  }
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    row.join('|');
    board.push(row);
  }

  var numberOfBombsPlaced = 0;
  while (numberOfBombs != numberOfBombsPlaced) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
};

var printBoard = function printBoard(board) {
  var formattedBoard = board.map(function (row) {
    return row.join('|');
  }).join('\n');
  return formattedBoard;
};

var playerBoard = generatePlayerBoard(4, 5);
var bombBoard = generateBombBoard(4, 5, 10);
console.log('Player Board: \n' + printBoard(playerBoard));
console.log('Bomb Board: \n' + printBoard(bombBoard));