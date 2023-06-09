document.addEventListener("DOMContentLoaded", function () {
  
  // Constants
  const overlayText = document.querySelector(".overlay-text");
  const gameOverText = document.getElementById("game-over-text");
  const winningText = document.getElementById("winning-text");
  const restartButton = document.querySelector(".overlay-text-small");
  const clickedCardSound = document.getElementById("clicked-card");
  const gameLostSound = document.getElementById("game-lost");
  const winGameSound = document.getElementById("win-game");
  const messageElement = document.getElementById("message");

 // Variables
  let flippedCards = [];
  let matchedCards = [];
  let isClickable = false;
  let timer = null;
  let matchScore = 0;

  //catched elements
  const cards = document.querySelectorAll(".card");
  const timeRemainingElement = document.getElementById("time-remaining");
  const matchesElement = document.getElementById("matches");

  cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
  });

 // Event Listeners
  overlayText.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
  winningText.addEventListener("click", restartGame);
  gameOverText.addEventListener("click", restartGame);

 // Functions
  function shuffleCards() {
    cards.forEach(function (card) {
      let randomPosition = Math.floor(Math.random() * cards.length);
      card.style.order = randomPosition;
    });
  }

  function flipCard() {
    if (
      !isClickable ||
      this.classList.contains("matched") ||
      this.classList.contains("flipped") ||
      flippedCards.length === 2
    )
      return;

    this.classList.toggle("flipped");
    clickedCardSound.play();

    flippedCards.push(this);

    if (flippedCards.length === 2) {
      isClickable = false;
      let card1 = flippedCards[0];
      let card2 = flippedCards[1];

      if (card1.innerHTML === card2.innerHTML) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        flippedCards = [];
        matchScore++;

        matchesElement.textContent = matchScore;

        if (matchedCards.length === cards.length || matchScore === 6) {
          gameWon();
        } else {
          isClickable = true;
        }
      } else {
        setTimeout(function () {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
          isClickable = true;
          
          displayMessage(" ");
        }, 1000);
        displayMessage("Try again!");
      }
    }
  }

  function displayMessage(message) {
    messageElement.textContent = message;
  }

  function gameWon() {
    resetTimer();
    clearInterval(timer);
    winGameSound.play();
    overlayText.classList.remove("visible");
    winningText.classList.add("visible");
    clickedCardSound.pause();
    clickedCardSound.currentTime = 0;
    restartButton.style.display = "block";
    restartButton.removeEventListener("click", startGame);
    restartButton.addEventListener("click", restartGame);
  }

  function gameOver() {
    resetTimer();
    clearInterval(timer);
    gameLostSound.play();
    overlayText.classList.remove("visible");
    gameOverText.classList.add("visible");
    clickedCardSound.pause();
    clickedCardSound.currentTime = 0;
    restartButton.style.display = "block";
    restartButton.removeEventListener("click", startGame);
    restartButton.addEventListener("click", restartGame);
  }

  function resetTimer() {
    clearInterval(timer);
    timeRemainingElement.textContent = "20";
  }

  //initializes the game
  function startGame() {
    resetTimer();
    isClickable = true;
    let timeRemaining = 20;
    timeRemainingElement.textContent = timeRemaining;
    matchScore = 0;

    shuffleCards();
    timer = setInterval(function () {
      timeRemaining--;

      if (timeRemaining === 0) {
        gameOver();
      }

      timeRemainingElement.textContent = timeRemaining;
    }, 1000);
    overlayText.classList.remove("visible");
  }

  function restartGame() {
    resetTimer();
    clearInterval(timer);
    matchedCards = [];
    flippedCards = [];

    cards.forEach(function (card) {
      card.classList.remove("flipped");
      card.classList.remove("matched");
    });

    timeRemainingElement.textContent = "20";
    matchesElement.textContent = "0";
    overlayText.classList.add("hidden");
    winningText.classList.remove("visible");
    gameOverText.classList.remove("visible");
    restartButton.addEventListener("click", restartGame);
    clickedCardSound.pause();
    clickedCardSound.currentTime = 0;
    matchScore = 0;

    startGame();
  }
});
