const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("myab");
startButton.addEventListener("click", buttonClicked);
const startButton2 = document.getElementById("count");
startButton2.addEventListener("click", counting);
let final = 0;

const deck = [
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD'
];

const Dealer = [];
const player1 = [];
const player2 = [];
const Table = [];

const cardImages = {};
function loadImages() {
  // Add card back image
  const cardBack = new Image();
  cardBack.src = `cards/card-back.png`;
  cardBack.onload = () => {
    cardImages['card-back'] = cardBack;
    checkAllImagesLoaded();
  };

  let loadedImagesCount = 0;

  for (const card of deck) {
    const img = new Image();
    img.src = `cards/${card}.png`;
    img.onload = () => {
      loadedImagesCount++;
      cardImages[card] = img;
      checkAllImagesLoaded();
    };
  }

  function checkAllImagesLoaded() {
    if (loadedImagesCount === deck.length && cardImages['card-back']) {
      init();
    }
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
    Dealer.push(deck.pop());
    player1.push(deck.pop());
    player2.push(deck.pop());
  }
}

function drawCards() {
  ctx.fillStyle = '#2ECC71'; // Set the fill color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the color
  
  // Draw dealer's cards
  Dealer.forEach((card, index) => {
    if (index === 0) {
      ctx.drawImage(cardImages['card-back'], 600, 20, 125, 181);
    } else {
      ctx.drawImage(cardImages[card], 600 + index * 140, 20, 125, 181);
    }
  });
  text("Dealer", 730, 230);

  player1.forEach((card, index) => {
    drawRotatedImage(cardImages[card], 100 + index * 170 - (index*50), 220+(index*120), 150, 217.8, 45);
  });
  text("Player 1", 180, 600);

  player2.forEach((card, index) => {
    drawRotatedImage(cardImages[card], 1100 + index * 170 - (index * 50), 340 - (index * 120), 150, 217.8, -45);
  });
  text("Player 2", 1275, 600);
  //text("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", 0, 587);
  drawTableCards();

  // Display the current counting value
  text(final.toString(), 1175, 150);

}

//500 × 726


function drawRotatedImage(image, x, y, width, height, angleInDegrees) {
  // Convert angle from degrees to radians
  const angleInRadians = angleInDegrees * (Math.PI / 180);

  // Save the current context state
  ctx.save();

  // Translate the context to the center of the image
  ctx.translate(x + width / 2, y + height / 2);

  // Rotate the context by the specified angle (in radians)
  ctx.rotate(angleInRadians);

  // Draw the image with the center of the image at the origin
  ctx.drawImage(image, -width / 2, -height / 2, width, height);

  // Restore the context to its original state
  ctx.restore();
}



function text(text, width, height) {
  ctx.font = "30px Arial"; // Change font style and size
  ctx.fillStyle = "white"; // Change font color
  ctx.textAlign = "center";
  ctx.fillText(text, width, height);
}

function buttonClicked() {
  Table.push(deck.pop());
  Table.push(deck.pop());
  drawTableCards();
}


function drawTableCards() {
  if (Table[2] && Table[3]) {
    Table.shift();
    Table.shift();
    player1.shift();
    player1.shift();
    player2.shift();
    player2.shift();
    Dealer.shift();
    Dealer.shift();
    dealCards();
  }
  Table.forEach((card, index) => {
    ctx.drawImage(cardImages[card], 575 + index * 164, 420, 150, 217.8);
  });
}


function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  shuffle(deck);
  dealCards();
  animate();
}

function counting() {
  Table.forEach((card, index) => {
    identifier(Table[index]);
  });
  player1.forEach((card, index) => {
    identifier(player1[index]);
  });
  player2.forEach((card, index) => {
    identifier(player2[index]);
  });
  //console.log(txt);
}

function identifier(str) {
  ident = str[0];
  if (ident == "A" || ident == "1" || ident == "J" || ident == "Q" || ident == "K") {
    --final;
  }
  else if (ident == "2" || ident == "3" || ident == "4" || ident == "5" || ident == "6") {
    ++final;
  }
}


function animate() {
  drawCards();
  requestAnimationFrame(animate);
}


loadImages();
