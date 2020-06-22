// Challenge 1
let clicked = false;

function ageInDays() {
  if (clicked) {
    reset();
  }
  let birthYear = prompt("Your Birth Year?");
  let currentYear = new Date().getFullYear();
  let days = (currentYear - birthYear) * 365;
  let h1 = document.createElement("h1");
  let textAnswer = document.createTextNode("You are " + days + " days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
  clicked = true;
}

function reset() {
  document.getElementById("ageInDays").remove();
  clicked = false;
}

// Challenge 2
function generateCat() {
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src =
    "https://i.pinimg.com/originals/c3/2b/fa/c32bfa16bcf864e478d3ddfe32440268.gif";
  div.appendChild(image);
}

// Challenge 3
function rpsGame(yourChoice) {
  console.log(yourChoice);
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = randomBot(["rock", "paper", "scissor"]);
  results = decideWiner(humanChoice, botChoice);
  console.log(botChoice);
  console.log(results);
  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randomBot(option) {
  return option[Math.floor(Math.random() * option.length)];
}

function decideWiner(humanChoice, botChoice) {
  let combinations = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };
  let yourScore = combinations[humanChoice][botChoice];
  let botScore = combinations[botChoice][humanChoice];

  return [yourScore, botScore];
}

function finalMessage(results) {
  if (results[0] === results[1]) {
    return ["You Tied", "yellow"];
  }
  if (results[0] == 1) {
    return ["You Won!", "green"];
  }
  return ["You Lost!", "red"];
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let imageData = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageData[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage[1] +
    "; font-size: 60px; padding: 30px' '>" +
    finalMessage[0] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageData[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4
let all_button = document.getElementsByTagName("button");
let mainColor = [];
for (let i = 0; i < all_button.length; i++) {
  mainColor.push(all_button[i].classList[1]);
}
uniqueColor = new Set(mainColor);
colors = Array.from(uniqueColor);

function buttonColorChange(buttonOption) {
  if (buttonOption.value == "red") {
    buttonsRed();
  } else if (buttonOption.value == "green") {
    buttonsGreen();
  } else if (buttonOption.value == "reset") {
    buttonsReset();
  } else {
    buttonRandom();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.replace(all_button[i].classList[1], "btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.replace(all_button[i].classList[1], "btn-success");
  }
}

function buttonsReset() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.replace(all_button[i].classList[1], mainColor[i]);
  }
}

function buttonRandom() {
  for (let i = 0; i < all_button.length; i++) {
    random = Math.floor(Math.random() * colors.length);
    all_button[i].classList.replace(all_button[i].classList[1], colors[random]);
  }
}

// Challenge 5
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsValue: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  isStand: false,
  turnOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("./static/sounds/swish.m4a");
const winSound = new Audio("./static/sounds/cash.mp3");
const lossSound = new Audio("./static/sounds/aww.mp3");

document.querySelector("#hit-button").addEventListener("click", blackJackHit);
document.querySelector("#stand-button").addEventListener("click", botPlay);
document.querySelector("#deal-button").addEventListener("click", blackJackDeal);

function blackJackHit() {
  if (blackjackGame["isStand"]) {
    return;
  }

  card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);

  if (blackjackGame["you"]["score"] > 21) {
    blackjackGame["turnOver"] = true;
    blackjackGame["isStand"] = true;
    showScore(YOU);
    showResult(DEALER);
    // blackJackDeal();
  }
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// const botPlay = async () => {
//   while (true) {
//     await sleep(1000);
//     let card = randomCard();
//     showCard(card, DEALER);
//     updateScore(card, DEALER);
//     showScore(DEALER);

//     if (DEALER["score"] > 21 || DEALER["score"] > YOU["score"] || DEALER["score"] == YOU["score"]) {
//       blackjackGame['turnOver'] = true;
//       showResult(computeWinner());
//       return;
//     }
//   }
// }

async function botPlay() {
  if (blackjackGame["isStand"]) {
    return;
  }
  blackjackGame["isStand"] = true;
  while (true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);

    if (
      DEALER["score"] > 21 ||
      DEALER["score"] > YOU["score"] ||
      DEALER["score"] == YOU["score"]
    ) {
      blackjackGame["turnOver"] = true;
      showResult(computeWinner());
      return;
    }

    await sleep(1000);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] > 21) {
    return;
  }
  let cardImage = document.createElement("img");
  cardImage.src = `./static/images/${card}.png`;
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
  hitSound.play();
}

function blackJackDeal() {
  if (!blackjackGame["turnOver"] || !blackjackGame["isStand"]) {
    return;
  }
  blackjackGame["turnOver"] = false;
  blackjackGame["isStand"] = false;

  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");
  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }

  YOU["score"] = 0;
  DEALER["score"] = 0;

  document.querySelector("#your-blackjack-result").textContent = 0;
  document.querySelector("#dealer-blackjack-result").textContent = 0;
  document.querySelector("#blackjack-result").textContent = "Let's Play";

  document.querySelector("#your-blackjack-result").style.color = "#fff";
  document.querySelector("#dealer-blackjack-result").style.color = "#fff";
  document.querySelector("#blackjack-result").style.color = "black";
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card == "A") {
    if (activePlayer["score"] + 11 > 21) {
      activePlayer["score"] += blackjackGame["cardsValue"][card][0];
    } else {
      activePlayer["score"] += blackjackGame["cardsValue"][card][1];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsValue"][card];
  }
  console.log(activePlayer["score"]);
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      console.log("you");
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("dealer");
      winner = DEALER;
    } else {
      console.log("draw");
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    console.log("dealer");
    winner = DEALER;
  } else {
    console.log("draw");
  }

  return winner;
}

function showResult(winner) {
  if (winner == YOU) {
    blackjackGame["you"]["wins"]++;
  } else if (winner == DEALER) {
    blackjackGame["you"]["losses"]++;
  } else {
    blackjackGame["you"]["draws"]++;
  }

  let message, messageColor;

  if (winner === YOU) {
    message = "You Won!";
    messageColor = "green";
    winSound.play();
  } else if (winner === DEALER) {
    message = "You Lost!";
    messageColor = "red";
    lossSound.play();
  } else {
    message = "You Drew!";
    messageColor = "Black";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
  document.querySelector("#wins").textContent = blackjackGame["you"]["wins"];
  document.querySelector("#loses").textContent = blackjackGame["you"]["losses"];
  document.querySelector("#draws").textContent = blackjackGame["you"]["draws"];
}
