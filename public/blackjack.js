const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const deck = [
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD'
];

const player1 = [];
const player2 = [];
const player3 = [];

const cardImages = {};

function loadImages() {
  let loadedImagesCount = 0;

  for (const card of deck) {
    const img = new Image();
    img.src = `cards/${card}.png`;
    img.onload = () => {
      loadedImagesCount++;
      if (loadedImagesCount === deck.length) {
        init();
      }
    };
    cardImages[card] = img;
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function dealCards() {
  for (let i = 0; i < 2; i++) {
    player1.push(deck.pop());
    player2.push(deck.pop());
    player3.push(deck.pop());
  }
}

function drawCards() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw player1's cards
  player1.forEach((card, index) => {
    ctx.drawImage(cardImages[card], 20 + index * 100, 20, 125, 181);
  });

  // Draw player2's cards
  player2.forEach((card, index) => {
    ctx.drawImage(cardImages[card], 20 + index * 200, 200, 125, 181);
  });

  // Draw player3's cards
  player3.forEach((card, index) => {
    ctx.drawImage(cardImages[card], 20 + index * 300, 380, 125, 181);
  });
}


function init() {
  shuffle(deck);
  dealCards();
  drawCards();
}

loadImages();
