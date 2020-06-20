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
