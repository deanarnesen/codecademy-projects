let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

function generateTarget() {
    return Math.floor(Math.random() * 10);
}

function compareGuesses(player, computer, target) {
    let hScore = Math.abs(player - target);
    let cScore = Math.abs(computer - target);
    return cScore >= hScore;
}

function updateScore(winner) {
    if (winner === 'human') {
        humanScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
}

function advanceRound() {
    currentRoundNumber += 1;
}