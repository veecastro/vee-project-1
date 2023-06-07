document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const overlayText = document.querySelector(".overlay-text");
  const gameOverText = document.getElementById("game-over-text");
  const winningText = document.getElementById("winning-text");
  const restartButton = document.querySelector(".overlay-text-small");
  const clickedCardSound = document.getElementById("clicked-card");
  const gameLostSound = document.getElementById("game-lost");
  const winGameSound = document.getElementById("win-game");


  let flippedCards = [];
  let matchedCards = [];
  let isClickable = false;
  let timer;
  let matchScore = 0;


  const timeRemainingElement = document.getElementById("time-remaining");
  const matchesElement = document.getElementById("matches");


  cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
  });

  overlayText.addEventListener("click", startGame);


  function shuffleCards() {
    cards.forEach(function (card) {
      let randomPosition = Math.floor(Math.random() * cards.length);
      card.style.order = randomPosition;
    });
  }

  function flipCard() {
    if (!isClickable || this.classList.contains("matched") || flippedCards.length === 2) return;

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
        }, 1000);
      }
    }
  }

  function gameWon() {
    clearInterval(timer);
    winGameSound.play();
    overlayText.classList.remove("visible");
    winningText.classList.add("visible");
    restartButton.addEventListener("click", restartGame);
    overlayText.removeEventListener("click", startGame);
    clickedCardSound.pause();
    clickedCardSound.currentTime = 0;
    restartButton.style.display = "block";
  }

  function gameOver() {
    clearInterval(timer);
    gameLostSound.play();
    overlayText.classList.remove("visible");
    gameOverText.classList.add("visible");
   restartButton.addEventListener("click", restartGame);
    clickedCardSound.pause();
  clickedCardSound.currentTime = 0;
  restartButton.style.display = "block";
  }

  function resetTimer() {
    clearInterval(timer);
    timeRemainingElement.textContent = "20";
  }

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
    matchedCards = [];
    flippedCards = [];
    clearInterval(timer);

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
    // restartButton.style.display = "none";
    restartButton.addEventListener("click", startGame); 
    clickedCardSound.pause();
    clickedCardSound.currentTime = 0;
 
  }

});






















 
   
 

