const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        updateScore();
        checkForWin();
    } else {
        unflipCards();
        togglePlayer();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function togglePlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

function updateScore() {
    if (currentPlayer === 1) {
        player1Score++;
        document.getElementById('player1Score').textContent = player1Score;
    } else {
        player2Score++;
        document.getElementById('player2Score').textContent = player2Score;
    }
}

function checkForWin() {
    const totalMatches = cards.length / 2;
    if (player1Score + player2Score === totalMatches) {
        const winner = (player1Score > player2Score) ? 'Jogador 1' : 'Jogador 2';
        alert(`${winner} venceu!`);
        const restartGame = confirm('Desejam reiniciar o jogo?');
        if (restartGame) {
            resetGame();
        }
    }
}

function resetGame() {
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    player1Score = 0;
    player2Score = 0;
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;

    shuffleCards();
}

function shuffleCards() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });

    lockBoard = false;
}

(function initializeGame() {
    shuffleCards();
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });
})();
