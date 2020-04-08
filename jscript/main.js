var squares = document.querySelectorAll(".square");
var colorHeader = document.querySelector(".correct-color");
var gameStart = true;
var gameResult = document.querySelector("#game-result a");
var gameOver = false;
var jumbotron = document.querySelector("#main-board");
var correctColor;
var difLevels = document.querySelectorAll("#difficulty .nav-link");
var playAgain = document.querySelector("#new-game");
var index;

init();

function init() {
  setupSquares();
  newGame();
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      if (this == correctColor && !gameOver) {
        gameResult.classList.add("correct");
        gameResult.textContent = "Correct!";
        gameOver = true;
        playAgain.textContent = "PLAY AGAIN?";

        gameFinished(correctColor);
      } else if (!gameOver) {
        this.classList.add("fadedOut");
        gameResult.textContent = "Try again";
      }
      gameResult.classList.remove("hide");
    });
  }
}

function random_rgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function gameFinished(color) {
  var bgColor = color.style.backgroundColor;

  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = bgColor;
    squares[i].classList.remove("fadedOut");
  }

  jumbotron.style.backgroundColor = bgColor;
}

function randomIndex() {
  var active = document.querySelector("#difficulty .active");
  var isLevelEasy = false;

  if (active.id == "level-hard") {
    index = Math.floor(Math.random() * 6);
  } else {
    index = Math.floor(Math.random() * 3);
    isLevelEasy = true;
  }

  return isLevelEasy;
}

function newGame() {
  var isLevelEasy = randomIndex();
  correctColor = squares[index];

  for (var i = squares.length - 1, cnt = 0; i >= 0; i--) {
    if (isLevelEasy && cnt < 3) {
      squares[i].classList.add("d-none");
      cnt++;
    } else if (!isLevelEasy) {
      squares[i].classList.remove("d-none");
    }

    squares[i].style.backgroundColor = random_rgb();
    squares[i].classList.remove("fadedOut");
  }

  setupText();
}

function setupText() {
  jumbotron.style.backgroundColor = "#3c76ae";
  gameResult.classList.add("hide");
  gameResult.textContent = "";
  gameResult.classList.remove("correct");
  gameOver = false;
  colorHeader.textContent = correctColor.style.backgroundColor.toUpperCase();
  playAgain.textContent = "NEW GAME";
}

function levels(obj) {
  if (!obj.classList.contains("active")) {
    for (var i = 0; i < difLevels.length; i++) {
      difLevels[i].classList.toggle("active");
    }
  }

  newGame();
}
