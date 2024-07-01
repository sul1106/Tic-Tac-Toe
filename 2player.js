document.addEventListener('DOMContentLoaded', () => {
  // Define elements for game1.html
  const multiplayerButton = document.querySelector('.multiplayer');
  const enternames = document.querySelector('.enter-names');
  const submitButton = document.querySelector('.submit');

  if (multiplayerButton && enternames && submitButton) {
      function multiplayerclick() {
          enternames.classList.remove('hide');
          enternames.classList.add('show');
      }

      function handleSubmit() {
          const player1 = document.getElementById('player1').value.trim();
          const player2 = document.getElementById('player2').value.trim();

          if (player1 && player2) {
              localStorage.setItem('player1', player1);
              localStorage.setItem('player2', player2);
              window.location.href = 'multiplayer.html';
          } else {
              alert('Please enter names for both players.');
          }
      }

      multiplayerButton.addEventListener('click', multiplayerclick);
      submitButton.addEventListener('click', handleSubmit);
  }

  const player1Name = localStorage.getItem('player1');
  const player2Name = localStorage.getItem('player2');
  const player1NameElement = document.querySelector('.Player-1');
  const player2NameElement = document.querySelector('.Player-2');

  if (player1Name && player2Name) {
      player1NameElement.textContent = player1Name;
      player2NameElement.textContent = player2Name;
  }

  // Define elements for multiplayer.html
  const boxes = document.querySelectorAll(".box");
  const resultElement = document.querySelector(".result");
  const newGameButton = document.querySelector(".newgame");
  const undoButton = document.querySelector(".undo");
  const playerXScoreElement = document.querySelector(".p1score");
  const playerOScoreElement = document.querySelector(".p2score");

  // Lines
  const hlines = document.querySelectorAll(".hline");
  const vlines = document.querySelectorAll(".vline");
  const dlines = document.querySelectorAll(".dline");

  if (boxes.length > 0 && resultElement && newGameButton && undoButton && playerXScoreElement && playerOScoreElement) {
      let playerXWins = 0;
      let playerOWins = 0;
      let numOfGames = 0;
      let isXTurn = true;
      let count = 0;
      let gameActive = true;
      let history = [];

      const winningPatterns = [
          { pattern: [0, 1, 2], line: 'hline1' },
          { pattern: [3, 4, 5], line: 'hline2' },
          { pattern: [6, 7, 8], line: 'hline3' },
          { pattern: [0, 4, 8], line: 'dline1' },
          { pattern: [2, 4, 6], line: 'dline2' },
          { pattern: [0, 3, 6], line: 'vline1' },
          { pattern: [1, 4, 7], line: 'vline2' },
          { pattern: [2, 5, 8], line: 'vline3' }
      ];

      function checkWinner() {
          let winner = false;
          winningPatterns.forEach((item) => {
              const pos0 = boxes[item.pattern[0]].innerText;
              const pos1 = boxes[item.pattern[1]].innerText;
              const pos2 = boxes[item.pattern[2]].innerText;
              if (pos0 && pos0 === pos1 && pos1 === pos2) {
                  winner = true;
                  resultElement.classList.remove("hide");
                  const winnerName = pos0 === 'X' ? player1Name : player2Name;
                  resultElement.innerText = `${winnerName} is the winner`;
                  disableBoxes();
                  updateScore(pos0);
                  hlines.forEach(line => line.classList.add('hide'));
                  vlines.forEach(line => line.classList.add('hide'));
                  dlines.forEach(line => line.classList.add('hide'));
                  if (item.line === 'hline1') {
                      const winningLine = document.querySelector('.hline.hline1');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'hline2') {
                      const winningLine = document.querySelector('.hline.hline2');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'hline3') {
                      const winningLine = document.querySelector('.hline.hline3');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'dline1') {
                      const winningLine = document.querySelector('.dline.dline1');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'dline2') {
                      const winningLine = document.querySelector('.dline.dline2');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'vline1') {
                      const winningLine = document.querySelector('.vline.vline1');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'vline2') {
                      const winningLine = document.querySelector('.vline.vline2');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  } else if (item.line === 'vline3') {
                      const winningLine = document.querySelector('.vline.vline3');
                      winningLine.classList.remove('hide');
                      winningLine.classList.add('show');
                  }

                  numOfGames++;
                  if (numOfGames >= 3) {
                      displaySeriesResult();
                  } else {
                      setTimeout(() => {
                          resetGame();
                          if (item.line === 'hline1') {
                              const winningLine = document.querySelector('.hline.hline1');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'hline2') {
                              const winningLine = document.querySelector('.hline.hline2');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'hline3') {
                              const winningLine = document.querySelector('.hline.hline3');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'dline1') {
                              const winningLine = document.querySelector('.dline.dline1');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'dline2') {
                              const winningLine = document.querySelector('.dline.dline2');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'vline1') {
                              const winningLine = document.querySelector('.vline.vline1');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'vline2') {
                              const winningLine = document.querySelector('.vline.vline2');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          } else if (item.line === 'vline3') {
                              const winningLine = document.querySelector('.vline.vline3');
                              winningLine.classList.remove('show');
                              winningLine.classList.add('hide');
                          }
                      },2000); 
                  }
              }
          });
          return winner;
      }

      function updateScore(winner) {
          if (winner === 'X') {
              playerXWins++;
              playerXScoreElement.innerHTML = playerXWins;
          } else if (winner === 'O') {
              playerOWins++;
              playerOScoreElement.innerHTML = playerOWins;
          }
      }

      function gameDraw() {
          resultElement.classList.remove("hide");
          resultElement.innerText = "The Game is Draw";
          disableBoxes();
          setTimeout(resetGame, 2000);
      }

      function resetGame() {
          if (numOfGames < 3) {
              isXTurn = true;
              count = 0;
              resultElement.classList.add("hide");
              enableBoxes();
              history = [];
              gameActive = true;
              hlines.forEach(line => {
                  line.classList.remove('show');
                  line.classList.add('hide');
              });
              vlines.forEach(line => {
                  line.classList.remove('show');
                  line.classList.add('hide');
              });
              dlines.forEach(line => {
                  line.classList.remove('show');
                  line.classList.add('hide');
              });
          } else {
              displaySeriesResult();
          }
      }

      const handleBoxClick = (box) => {
          if (box.innerText === "" && gameActive) {
              box.innerText = isXTurn ? "X" : "O";
              box.disabled = true;
              count++;
              history.push({ box: box, value: box.innerText });
              if (!checkWinner() && count === 9) {
                  gameDraw();
              } else {
                  isXTurn = !isXTurn;
              }
          }
      }

      boxes.forEach((box) => {
          box.addEventListener("click", () => {
              handleBoxClick(box);
          });
      });

      newGameButton.addEventListener("click", () => {
          numOfGames = 0;
          playerXWins = 0;
          playerOWins = 0;
          playerXScoreElement.innerHTML = playerXWins;
          playerOScoreElement.innerHTML = playerOWins;
          resetGame();
      });

      undoButton.addEventListener("click", () => {
          resultElement.classList.add("hide");
          if (history.length > 0) {
              const lastMove = history.pop();
              lastMove.box.innerText = "";
              lastMove.box.disabled = false;
              isXTurn = !isXTurn;
              count--;
          }
      });

      function disableBoxes() {
          boxes.forEach((box) => {
              box.disabled = true;
          });
      }

      function enableBoxes() {
          boxes.forEach((box) => {
              box.disabled = false;
              box.innerText = "";
          });
      }

      function displaySeriesResult() {
          if (playerXWins > playerOWins) {
              resultElement.textContent =player1Name+ " wins the series!";
          } else if (playerXWins < playerOWins) {
              resultElement.textContent =player2Name+ " wins the series!";
          } else {
              resultElement.textContent = "Series is a draw!";
          }
          resultElement.classList.remove('hide');
          gameActive = false;
      }
  }
});
