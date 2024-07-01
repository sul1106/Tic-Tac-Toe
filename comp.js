document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const lines = document.querySelectorAll(".line");
  const resultDisplay = document.getElementById("result");
  const newGameButton = document.querySelector(".newgame");
  const undoButton = document.querySelector(".undo");
  const compscore = document.querySelector(".compscore");
  const playerscore = document.querySelector(".playerscore");
  let compWins = 0;
  let playerWins = 0;
  let numOfGames = 0;
  let board = Array(9).fill("");
  let currentPlayer = "X";
  let gameActive = true;
  let moves = [];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
  });

  newGameButton.addEventListener("click", resetAllGames);
  undoButton.addEventListener("click", undoMove);

  function handleBoxClick(index) {
    if (board[index] !== "" || !gameActive) {
      return;
    }

    board[index] = currentPlayer;
    moves.push(index);
    updateBoard();
    checkResult();

    if (gameActive && currentPlayer === "X") {
      currentPlayer = "O";
      setTimeout(computerMove, 800); 
    }
  }

  function computerMove() {
    let bestMove = getBestMove(board, "O");
    if (bestMove !== -1) {
      board[bestMove] = "O";
      moves.push(bestMove);
      updateBoard();
      checkResult();
      currentPlayer = "X";
    }
  }

  function getBestMove(board, player) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player;
        if (checkWin(board, player)) {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player === "O" ? "X" : "O";
        if (checkWin(board, player === "O" ? "X" : "O")) {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }

    const emptyIndexes = board
      .map((val, idx) => (val === "" ? idx : null))
      .filter((val) => val !== null);
    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  function checkWin(board, player) {
    return winningConditions.some((condition) => {
      return condition.every((index) => board[index] === player);
    });
  }

  function checkResult() {
    if (checkWin(board, "X")) {
      playerWins++;
      playerscore.innerHTML = playerWins;
      numOfGames++;
      displayResult("You Win!");
      highlightWinningLines("X");
    } else if (checkWin(board, "O")) {
      compWins++;
      compscore.innerHTML = compWins;
      numOfGames++;
      displayResult("Computer Wins!");
      highlightWinningLines("O");
    } else if (!board.includes("")) {
      displayResult("It's a Draw!");
    }
  }

  function highlightWinningLines(player) {
    winningConditions.forEach((condition) => {
      if (condition.every((index) => board[index] === player)) {
        if (condition[0] === 0 && condition[2] === 2) {
          document.querySelector(".hline1").classList.add("show");
        } else if (condition[0] === 3 && condition[2] === 5) {
          document.querySelector(".hline2").classList.add("show");
        } else if (condition[0] === 6 && condition[2] === 8) {
          document.querySelector(".hline3").classList.add("show");
        } else if (condition[0] === 0 && condition[2] === 6) {
          document.querySelector(".vline1").classList.add("show");
        } else if (condition[0] === 1 && condition[2] === 7) {
          document.querySelector(".vline2").classList.add("show");
        } else if (condition[0] === 2 && condition[2] === 8) {
          document.querySelector(".vline3").classList.add("show");
        } else if (condition[0] === 0 && condition[2] === 8) {
          document.querySelector(".dline1").classList.add("show");
        } else if (condition[0] === 2 && condition[2] === 6) {
          document.querySelector(".dline2").classList.add("show");
        }
      }
    });
  }

  function updateBoard() {
    boxes.forEach((box, index) => {
      box.textContent = board[index];
    });
    lines.forEach((line) => {
      line.classList.remove("show");
    });
  }

  function resetAllGames() {
    compWins = 0;
    playerWins = 0;
    numOfGames = 0;
    playerscore.innerHTML = playerWins;
    compscore.innerHTML = compWins;
    resetGame();
  }

  function resetGame() {
    if (numOfGames < 3) {
      board.fill("");
      moves = [];
      currentPlayer = "X";
      gameActive = true;
      resultDisplay.classList.add("hide");
      resultDisplay.classList.remove("show");
      updateBoard();
    } else {
      displaySeriesResult();
    }
  }

  function displayResult(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.remove("hide");
    resultDisplay.classList.add("show");
    gameActive = false;

    setTimeout(resetGame, 2000);
  }

  function displaySeriesResult() {
    if (playerWins > compWins) {
      resultDisplay.textContent = "You win the series!";
    } else if (playerWins < compWins) {
      resultDisplay.textContent = "Computer wins the series!";
    } else {
      resultDisplay.textContent = "Series is a draw!";
    }
    resultDisplay.classList.remove("hide");
    resultDisplay.classList.add("show");
  }
});
