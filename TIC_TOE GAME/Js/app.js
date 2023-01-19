// Get the game status and store in a variable
const statusDisplay = document.querySelector(".game__status");

// Initialize the game
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

// Game message 
const winningMessage = () => `player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the current player
statusDisplay.innerHTML = currentPlayerTurn();

// Winning conditions in sub-arrays
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function for cell played by player
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Function to handle player change
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? '0' : 'X';;
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to handle result validation 
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Display message when round is won
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // If round is draw display message
    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Function to handle cell clicked Event
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellEvent] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to handle Restart game Event
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelector(".cell").forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector(".game__restart").addEventListener('click', handleRestartGame);