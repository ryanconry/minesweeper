const generatePlayerBoard = (numberOfRows,numberOfColumns) =>{    //board to hold player's guesses
  let board=[];
  for(let i=0;i<numberOfRows;i++){
    let row=[];
    for(let j=0;j<numberOfColumns;j++){
      row.push('  ');
    }
    row.join('|');
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows,numberOfColumns,numberOfBombs) =>{
  let board=[];
  for(let i=0;i<numberOfRows;i++){
    let row=[];
    for(let j=0;j<numberOfColumns;j++){
      row.push(null);
    }
    row.join('|');
    board.push(row);
  }

  let numberOfBombsPlaced=0;
  while(numberOfBombs!=numberOfBombsPlaced){
    let randomRowIndex =  Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex]='B';
    numberOfBombsPlaced++;
  }
  return board;
}

const printBoard = (board) =>{
  let formattedBoard=board.map(row=> row.join('|')).join('\n');
  return formattedBoard;
}

let playerBoard = generatePlayerBoard(4,5);
const bombBoard = generateBombBoard(4,5,10);
console.log('Player Board: \n'+ printBoard(playerBoard));
console.log('Bomb Board: \n'+ printBoard(bombBoard))
