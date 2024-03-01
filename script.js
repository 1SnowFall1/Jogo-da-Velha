const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
let currentPlayer = 'X';
let gameActive = true;

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

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            playSound(winSound);
            return cells[a].textContent;
        }
    }
    return null;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function handleResult(result) {
    gameActive = false;
    if (result) {
        message.textContent = `${result} venceu!`;
    } else {
        message.textContent = 'Empate!';
    }
}

function makeMove(cell) {
    if (!gameActive || cell.textContent) return;

    playSound(clickSound);
    cell.textContent = currentPlayer;
    cell.classList.add('selected');

    const winner = checkWin();
    if (winner) {
        handleResult(winner);
        return;
    }

    if (checkDraw()) {
        handleResult(null);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win', 'selected');
    });
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => makeMove(cell));
});

restartButton.addEventListener('click', restartGame);
