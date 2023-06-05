if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}


// 1. Initialize variables…
//    - cards: an array of card objects with name and image properties
//    - score: a variable to keep track of the player's score
//    - timer: a variable to keep track of the game timer
//    - isGameActive: a boolean variable to track if the game is active
//    - wrongGuesses: a variable to count the number of wrong guesses
//    - flippedCards: an array to store the flipped cards
//    - flipCardAudio: an audio element for the card flipping sound
//    - gameWonAudio: an audio element for the game won sound
const cards = document.querySelectorAll('.game-card');
const timer = document.getElementById('.timer');
const score = document.querySelector('span')
const replay = document.getElementById('.replay')


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// 2. Shuffle the cards array to randomize the card order
(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  
// 3. Attach click event listeners to the card elements
cards.forEach(card => card.addEventListener('click', flipCard));
// 4. Implement card click event handler:

//    - Check if the game is active and the clicked card is not already flipped
//    - Play the flip card audio
//    - Flip the card to show the image
//    - Add the clicked card to the flippedCards array
//    - If two cards are flipped:
//      - Check if they match
//        - If yes, keep them flipped and check if all cards are matched
//        - If no, play the wrong guess audio, display the wrong guess message, and reset the flipped cards after a delay
//          - Increment the wrongGuesses counter
//          - If the wrongGuesses reach the maximum allowed, end the game as a loss
//    - Update the score display
//    - Start the game timer if it hasn't started yet

// 5. Implement game timer:
//    - Use setInterval to increment the timer value every second
//    - Check if the timer reaches the maximum allowed time
//      - If yes, end the game as a loss

// 6. Implement game win condition:
//    - Check if all cards are matched
//      - If yes, end the game as a win
//      - Play the game won audio

// 7. Implement audio elements:
//    - Create audio elements for flip card and game won sounds
//    - Play the audio elements at appropriate events

// 8. Implement a replay button:
//    - Attach a click event listener to the replay button element
//    - Call a function to reset the game and start a new game

// 9. Display the wrong guess message:
//    - Create an HTML element for the message container
//    - Set the message text to "Wrong guess!"
//    - Apply CSS styles to the message container
//    - Append the message container to the game interface

// 10. Update the score display:
//     - Update the score element with the current score value

// 11. Start the game:
//     - Set isGameActive to true
//     - Set score to 0
//     - Set timer to 0
//     - Set wrongGuesses to 0
//     - Clear the flippedCards array
//     - Start the timer

// 12. End the game as a win:
//     - Set isGameActive to false
//     - Stop the timer
//     - Display a "You won!" message
//     - Play the game won audio
//     - Enable the replay button

// 13. End the game as a loss:
//     - Set isGameActive to false
//     - Stop the timer
//     - Display a "You lost!" message
//     - Enable the replay button

// 14. Initialize the game:
//     - Call the startGame function to begin the game
function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('game-card'));

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        
    });
});
}


// 15. Continue gameplay until all cards are matched, the timer reaches the time limit, or the player chooses to replay the game