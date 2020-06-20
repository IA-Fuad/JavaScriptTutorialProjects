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
    'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
    'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
    'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 },
  }
  let yourScore = combinations[humanChoice][botChoice];
  let botScore = combinations[botChoice][humanChoice];

  return [yourScore, botScore];
}

function finalMessage(results) {
  if (results[0] === results[1]) {
    return ['You Tied', 'yellow'];
  }
  if (results[0] == 1) {
    return ['You Won!', 'green'];
  }
  return ['You Lost!', 'red'];
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let imageData = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissor': document.getElementById('scissor').src,
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  let humanDiv = document.createElement('div');
  let botDiv = document.createElement('div');
  let messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imageData[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage[1] + "; font-size: 60px; padding: 30px' '>" + finalMessage[0] + "</h1>";
  botDiv.innerHTML = "<img src='" + imageData[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}