// challenge 1: Your age in days

function ageInDays() {
    var birthYear = prompt("What year were you born... Good Friend");
    var ageInD = (new Date().getFullYear() - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAns = document.createTextNode('You are ' + ageInD + ' Days');
    h1.setAttribute('id', 'ageIndays');
    h1.appendChild(textAns);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageIndays').remove();
}

function genaratePanda() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-panda-gen');
    image.src = "static/image/panda.gif";
    div.appendChild(image);
}

//challenge 3

function rpsGame(yourchoice) {
    console.log(yourchoice.id);
    var botchoice, humanchoice;
    humanchoice = yourchoice.id;
    botchoice = numberToChoice(randToRpsInt());
    var results = decideWinner(humanchoice, botchoice);
    message = finalMessage(results);
    console.log(message);
    rpsFontEnd(yourchoice.id, botchoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'win'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rspDatabase = {
        'rock': { 'win': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'win': 0 },
        'win': { 'paper': 1, 'win': 0.5, 'rock': 0 }
    };

    var yourScore = rspDatabase[yourChoice][computerChoice];
    var computerScore = rspDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];

}

function finalMessage([yourscore, computerscore]) {
    if (yourscore === 0) {
        return { 'message': 'You lost', 'color': 'red' };
    } else if (yourscore === 0.5) {
        return { 'message': 'You tied', 'color': 'yellow' };
    } else {
        return { 'message': 'You won!!', 'color': 'green' };
    }
}
//tslint: disable: no - unused - variable

function rpsFontEnd(humanImagechoice, botImagechoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'win': document.getElementById('win').src,
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('win').remove();
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImagechoice] + "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML = "<h1 style= color:" + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImagechoice] + "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(238,38,24,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//Chanllenge 4: change the color of All Buttons

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    console.log(buttonThingy.value);
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonReset();
    } else if (buttonThingy.value === 'random') {
        buttonRandom();
    }
}

function buttonRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for (let i = 0; i < all_buttons.length; i++) {
        let random = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random]);
    }
}

//Challenge 5: Blackjack


let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'trunsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', delarLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        // console.log(YOU['score']);
        showScore(YOU);


    }

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/image/${card}.png`;
        //console.log(cardImage);
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
//Deal
function blackjackDeal() {
    // showResult(computeWinner());
    //computeWinner();
    if (blackjackGame['trunsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's Play Again";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['trunsOver'] = true
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delarLogic() {

    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        console.log(DEALER['score']);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['trunsOver'] = true;
    // if (DEALER['score'] > 15) {
    let winner = computeWinner();
    showResult(winner);

    // }

}

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score']) > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['wins']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['trunsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'Yout lost!';
            messageColor = 'red';
            loseSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew ';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}