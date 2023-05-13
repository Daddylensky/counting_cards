const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("myab");
startButton.addEventListener("click", dealNew);
const startButton2 = document.getElementById("count");
startButton2.addEventListener("click", counting);
const Button3 = document.getElementById("reveal");
Button3.addEventListener("click", reveal);
let final = 0;
let isDealCardsClicked = false;
let boolreveal = false;

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
  cardBack.src = `cards/back.png`;
  cardBack.onload = () => {
    cardImages['back'] = cardBack;
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
    if (loadedImagesCount === deck.length && cardImages['back']) {
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
    if (!boolreveal) {
      ctx.drawImage(cardImages['back'], 600, 20, 125, 181);
      ctx.drawImage(cardImages[card], 600 + index * 140, 20, 125, 181);
    } else if (boolreveal) {
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
  if (!isDealCardsClicked) {
    text(final.toString(), 1175 , 150);
  }
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
  ctx.font = "bold 30px 'Arial', sans-serif"; // Use a bold, sans-serif font
  ctx.fillStyle = "#FFFFFF"; // Use white for the text color
  ctx.textAlign = "center";
  
  // Add a slight shadow effect
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 2;
  
  ctx.fillText(text, width, height);
  
  // Reset the text shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

function dealNew() {
  isDealCardsClicked = true;
  boolreveal = false;
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
  if (!isDealCardsClicked) {
    showNotification('You must deal new cards before you can count the value');
    return; // return early if "Deal Cards" button was not clicked
  }
  Dealer.forEach((card, index) => {
    identifier(Dealer[index]);
  })
  
  Table.forEach((card, index) => {
    identifier(Table[index]);
  });
  player1.forEach((card, index) => {
    identifier(player1[index]);
  });
  player2.forEach((card, index) => {
    identifier(player2[index]);
  });

  isDealCardsClicked = false; // reset flag after counting
}

function reveal() {
  boolreveal = true;
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

function showNotification(message) {
  var notification = document.getElementById('notification');
  notification.innerHTML = message;
  notification.style.display = 'block';

  // Hide the notification after 3 seconds
  setTimeout(function() {
    notification.style.display = 'none';
  }, 3000);
}

function animate() {
  drawCards();
  requestAnimationFrame(animate);
}


loadImages();
