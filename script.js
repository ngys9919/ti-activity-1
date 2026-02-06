/**
 * Tic-Tac-Toe Game Logic
 * Modern Vanilla JS Implementation
 */

// Constants
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

// Game State
const state = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameActive: true
};

// DOM Elements
const elements = {
    cells: document.querySelectorAll('.cell'),
    statusText: document.getElementById('current-player'),
    restartBtn: document.getElementById('restart-btn'),
    overlayRestartBtn: document.getElementById('overlay-restart-btn'),
    overlay: document.getElementById('game-overlay'),
    resultMsg: document.getElementById('result-message')
};

/**
 * Initialize Event Listeners
 */
function init() {
    elements.cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    elements.restartBtn.addEventListener('click', restartGame);
    elements.overlayRestartBtn.addEventListener('click', restartGame);
}

/**
 * Handle individual cell clicks
 */
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    // Check if cell is valid to pick
    if (state.board[index] || !state.gameActive) {
        return;
    }

    // Update State
    placeMarker(index);
    
    // Check Status
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

/**
 * Place X or O on board
 */
function placeMarker(index) {
    state.board[index] = state.currentPlayer;
    const cell = elements.cells[index];
    cell.classList.add(state.currentPlayer.toLowerCase());
    cell.classList.add('taken');
}

/**
 * Swap players turns
 */
function swapTurns() {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    
    // Update UI
    elements.statusText.textContent = state.currentPlayer;
    elements.statusText.className = `player-${state.currentPlayer.toLowerCase()}`;
}

/**
 * Check if the current player has won
 */
function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
        const hasWon = combination.every(index => {
            return state.board[index] === state.currentPlayer;
        });

        if (hasWon) {
            highlightWinningCombination(combination);
            return true;
        }
        return false;
    });
}

/**
 * Check if the game is a draw
 */
function checkDraw() {
    return state.board.every(cell => cell !== null);
}

/**
 * Highlight cells that formed the winning combination
 */
function highlightWinningCombination(combination) {
    combination.forEach(index => {
        elements.cells[index].classList.add('winner');
    });
}

/**
 * Terminate the game and show result
 */
function endGame(draw) {
    state.gameActive = false;
    
    if (draw) {
        elements.resultMsg.textContent = "It's a Draw!";
    } else {
        elements.resultMsg.textContent = `Player ${state.currentPlayer} Wins!`;
    }

    elements.overlay.classList.remove('hidden');
}

/**
 * Restart the game state and board
 */
function restartGame() {
    // Reset State
    state.board.fill(null);
    state.currentPlayer = 'X';
    state.gameActive = true;

    // Reset UI
    elements.statusText.textContent = 'X';
    elements.statusText.className = 'player-x';
    elements.overlay.classList.add('hidden');
    
    elements.cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'taken', 'winner');
    });
}

// Start the game
init();
