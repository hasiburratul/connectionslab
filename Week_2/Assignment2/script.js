/* Tic Tac Toe Game

User Story: I can play a game of Tic Tac Toe with the computer.

User Story: My game will reset as soon as it's over so I can play again.

User Story: I can choose whether I want to play as X or O.
*/

/* Wish List

1. Replace win/tie alerts with animated text.
2. Fix computer AI to play perfectly.
3. Add rules?
4. Add tips on how to play perfectly?
*/

let board = [["", "", ""], ["", "", ""], ["", "", ""]];
let player;
let computer;
let squaresLeft = 9;
let cpuRow;
let cpuColumn;
const xbuttonElement = document.getElementById("xbutton");
const obuttonElement = document.getElementById("obutton");

/* Assigns the player and computer as X or O based on the button pressed at the start of the game, if O is chosen the computer moves first */
const chooseXorO = (symbol) => {
  if (symbol === "X") {
    player = "X";
    computer = "O";
    disableXO(symbol);
    enableBoard();
  } else if (symbol === "O"){
    player = "O";
    computer = "X";
    disableXO(symbol);
    enableBoard();
    computerMove();
  }
  else{
    alert("Reseting the game!");
    disableBoard();
    setTimeout(function() {
      gameReset();
    }, 1000);
  }
}

/* Disables the X and O buttons after they are clicked to start the game */
const disableXO = (symbol) => {
  if (symbol === "X") {
    xbuttonElement.disabled = true;
    xbuttonElement.style.color = "orange";
    obuttonElement.disabled = true;
    obuttonElement.style.color = "black";
    obuttonElement.style.border = "none";
  } else {
    xbuttonElement.disabled = true;
    xbuttonElement.style.color = "black";
    xbuttonElement.style.border = "none";
    obuttonElement.disabled = true;
    obuttonElement.style.color = "orange";
  }
}

/* Enables clicking of buttons on the board */
const enableBoard = () => {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
  }
}

/* When the user clicks a square, disables the square, and tests if the player has won, if it's a tie game, then generates a computer move and checks if the computer has won */
const userMove = (id) => {
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).innerText = player;

  board[id[0]][id[1]] = player;
  squaresLeft--;
  if (testWin(player)) {
    return;
  }
  if(!testTie()) {
    setTimeout(function() {
      computerMove();
  }, 250);
  }
}

/* Generates a random computer move in an empty square and disables that square */
const computerMove = () => {
  do {
    generateRandomMove();
  } while (
    board[cpuRow][cpuColumn] === player ||
    board[cpuRow][cpuColumn] === computer
  );
  board[cpuRow][cpuColumn] = computer;
  document.getElementById(cpuRow + "" + cpuColumn).innerHTML = computer;
  document.getElementById(cpuRow + "" + cpuColumn).removeAttribute("onclick");
  squaresLeft--;
  if (testWin(computer)) {
    return;
  }
  testTie();
}

/* Tests if 3 symbols in a row are the same and ends the game if true */
const testWin = (symbol) => {
  if (
    (board[0][0] === symbol &&
      board[0][1] === symbol &&
      board[0][2] === symbol) ||
    (board[1][0] === symbol &&
      board[1][1] === symbol &&
      board[1][2] === symbol) ||
    (board[2][0] === symbol &&
      board[2][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][0] === symbol &&
      board[2][0] === symbol) ||
    (board[0][1] === symbol &&
      board[1][1] === symbol &&
      board[2][1] === symbol) ||
    (board[0][2] === symbol &&
      board[1][2] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
  ) {
    alert(symbol + " wins!");
    disableBoard();
    setTimeout(function() {
    gameReset();
  }, 1000);
    return true;
  }
}

/* Random number generation for use in computer square selection*/
const generateRandomMove = () => {
  cpuRow = Math.floor(Math.random() * 3);
  cpuColumn = Math.floor(Math.random() * 3);
}

/* Disables clicking of buttons on the board */
const disableBoard = () => {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeAttribute("onclick");
  }
}

/* Tests if all the squares are full, and if so ends the game in a tie */
const testTie = () => {
  if (squaresLeft === 0) {
    alert("The game is a tie!");
    disableBoard();
    setTimeout(function() {
      gameReset();
    }, 1000);
    return true;
  }
}

/* Resets the game */
const gameReset = () => {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  squaresLeft = 9;
  xbuttonElement.disabled = false;
  xbuttonElement.style.color = "white";
  xbuttonElement.style.border = "1px solid white";
  obuttonElement.disabled = false;
  obuttonElement.style.color = "white";
  obuttonElement.style.border = "1px solid white";
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
    disableBoard();
  }
}