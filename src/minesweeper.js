const generatePlayerBoard = (numberOfRows,numberOfColumns) =>{    //board to hold player's guesses
  let board=[];
  for(let i=0;i<numberOfRows;i++){
    let row=[];
    for(let j=0;j<numberOfColumns;j++){
      row.push('  ');
    }
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
    board.push(row);
  }

  let numberOfBombsPlaced=0;
  while(numberOfBombs!=numberOfBombsPlaced){
    let randomRowIndex =  Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if(board[randomRowIndex][randomColumnIndex]!='B'){
      board[randomRowIndex][randomColumnIndex]='B';
      numberOfBombsPlaced++;
    }
  }
  return board;
}

const getNumberOfNeighbourBombs = (bombBoard,rowIndex,columnIndex) => {
  let neighbourOffsets=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const numberOfRows=bombBoard.length;
  const numberOfColumns=bombBoard[0].length;
  let numberOfBombs=0;
  neighbourOffsets.forEach(offset => {
    const neighbourRowOffset=offset[0] + rowIndex;
    const neighbourColumnOffset=offset[1] + columnIndex;

    if(neighbourRowOffset>=0 && neighbourRowOffset<numberOfRows && neighbourColumnOffset>=0 && neighbourColumnOffset < numberOfColumns){
      if(bombBoard[neighbourRowOffset][neighbourColumnOffset]=='B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTyle = (playerBoard,bombBoard,rowIndex,columnIndex){
  if(playerBoard[rowIndex][columnIndex] != ' '){
    console.log('This tyle has been flipped!');
    return;
  }
  else if(bomBoard[rowIndex][columnIndex] == 'B'){
    playerBoard[rowIndex][columnIndex]='B';
  }
  else{
    playerBoard[rowIndex][columnIndex]=getNumberOfNeighbourBombs(bombBoard,rowIndex,columnIndex)
  }
  return playerBoard;
}

const printBoard = (board) =>{
  let formattedBoard=board.map(row=> row.join('|')).join('\n');
  return formattedBoard;
}

let playerBoard = generatePlayerBoard(4,5);
const bombBoard = generateBombBoard(4,5,10);
console.log('Player Board: \n'+ printBoard(playerBoard));
console.log('Bomb Board: \n'+ printBoard(bombBoard));
getNumberOfNeighbourBombs(bombBoard,0,2);
getNumberOfNeighbourBombs(bombBoard,2,2);
getNumberOfNeighbourBombs(bombBoard,4,1);
