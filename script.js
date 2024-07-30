const winOption = document.querySelector('#win-option');
const loseOption = document.querySelector('#lose-option');
const randomOption = document.querySelector('#random-option');
const playButton = document.querySelector('#play-button');

let gameState = {
    width: 10,
    height: 10,
    mines: 10
};

function updateGameState(option) {
    switch (option) {
        case 'win':
            gameState.mines -= 2;
            break;
        case 'lose':
            gameState.mines += 2;
            break;
        case 'random':
            gameState.mines = Math.floor(Math.random() * 5) + 5;
            break;
    }
}

winOption.addEventListener('click', () => updateGameState('win'));
loseOption.addEventListener('click', () => updateGameState('lose'));
randomOption.addEventListener('click', () => updateGameState('random'));
playButton.addEventListener('click', () => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    window.location.href = 'game.html';
});