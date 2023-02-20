let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('td');
cells.forEach(cell => {
  cell.addEventListener('click', () => handleMove(cell));
});

function handleMove(cell) {
  const index = Array.from(cells).indexOf(cell);
  if (board[index] === '') {
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.innerHTML = currentPlayer;
    if (checkForWinner()) {
      setTimeout(() => {
        alert(currentPlayer + ' venceu!');
        resetGame();
      }, 100);
    } else if (checkForDraw()) {
      setTimeout(() => {
        alert('Empate!');
        resetGame();
      }, 100);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForDraw() {
  return board.every(cell => cell !== '');
}

function resetGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.innerHTML = '';
  });
  currentPlayer = 'X';
}
