const gameBoard = document.querySelector('.game-board');
const moneyCounter = document.querySelector('.money-counter');
const winLoseCounter = document.querySelector('.win-lose-counter');
const moneySlider = document.getElementById('money-slider');
const startGameButton = document.getElementById('start-game');

let gameState = {
    money: 100,
    cards: [],
    winStreak: 0,
    bombChance: 0.3
};

moneySlider.addEventListener('input', () => {
    gameState.money = parseInt(moneySlider.value); // Parse the slider value to an integer
    moneyCounter.textContent = `Money: $${gameState.money}`;
});

startGameButton.addEventListener('click', startGame);

function startGame() {
    gameState.cards = [];
    gameState.winStreak = 0;
    generateCards();
    renderBoard();
}

function generateCards() {
    for (let i = 0; i < 20; i++) {
        const card = {
            type: Math.random() < gameState.bombChance ? 'bomb' : 'diamond',
            revealed: false
        };
        gameState.cards.push(card);
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < gameState.cards.length; i++) {
        const card = gameState.cards[i];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = i;
        if (card.revealed) {
            if (card.type === 'diamond') {
                cardElement.textContent = '';
                cardElement.style.backgroundColor = 'gold';
            } else {
                cardElement.textContent = '';
                cardElement.style.backgroundColor = 'red';
            }
        }
        cardElement.addEventListener('click', () => revealCard(i));
        gameBoard.appendChild(cardElement);
    }
    // Add CSS grid layout to display cards in a 4x5 grid
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gameBoard.style.gridGap = '10px';
    moneyCounter.textContent = `Money: $${gameState.money}`;
    winLoseCounter.textContent = `Win Streak: ${gameState.winStreak}`;
}

function revealCard(index) {
    const card = gameState.cards[index];
    if (card.revealed) {
        return;
    }
    card.revealed = true;
    if (card.type === 'diamond') {
        gameState.money *= 2;
        gameState.winStreak++;
        if (gameState.winStreak >= 3) {
            gameState.bombChance -= 0.1;
        }
    } else {
        gameState.money /= 2;
        gameState.winStreak = 0;
    }
    renderBoard();
}