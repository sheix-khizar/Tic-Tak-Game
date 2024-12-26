let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetButton = document.getElementById('resetButton');

const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

function handleCellClick(event) {
    const cellIndex = event.target.id.split('-')[1];
    
    if (gameBoard[cellIndex] !== '' || gameOver) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Play click sound
    clickSound.play();

    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            statusText.textContent = `Player ${gameBoard[a]} wins!`;
            
            // Play win sound
            winSound.play();
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        statusText.textContent = "It's a draw!";
        
        // Play draw sound
        drawSound.play();
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;

    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
