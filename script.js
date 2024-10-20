// Load the character data from the JSON file
fetch('heroes.json')
  .then(response => response.json())
  .then(data => {
    // Shuffle the character data to randomize the order
    let shuffledData = data.sort(() => Math.random() - 0.5);

    // Initialize the game state
    let currentIndex = 0;
    let startTime = null;
    let correctGuesses = 0;
    let totalTime = 0;

    // Add event listener to the start button
    document.getElementById('start-button').addEventListener('click', startGame);

    // Function to start the game
    function startGame() {
      // Hide the start screen and show the game container
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('game-container').style.display = 'flex';
      shuffledData = data.sort(() => Math.random() - 0.5)//shuffle characters on game start to make sure that pressing restart, won't show the same heroes

      // Reset game state
      currentIndex = 0;
      startTime = new Date();
      correctGuesses = 0;
      totalTime = 0;

      // Display the first character
      displayCharacter(shuffledData[currentIndex]);

      // Add event listeners to the buttons
      document.getElementById('submit-button').addEventListener('click', checkGuess);
      document.getElementById('skip-button').addEventListener('click', skipCharacter);
      document.getElementById('give-up-button').addEventListener('click', giveUp);
      document.getElementById('restart-button').addEventListener('click', restartGame);
      
      // Add event listener to the input field for Enter key press
      document.getElementById('input-field').addEventListener('keydown', handleKeyPress);
    }

    // Function to display the current character
    function displayCharacter(character) {
      document.getElementById('character-image').src = character.image;
      document.getElementById('input-field').value = '';
    }

    // Function to handle key press events
    function handleKeyPress(event) {
      if (event.keyCode === 13) { // Enter key pressed
        checkGuess();
      }
    }

    // Function to check the player's guess
    function checkGuess() {
      const guess = document.getElementById('input-field').value.toLowerCase();
      const character = shuffledData[currentIndex];

      // Check if the guessed name is in the accepted names (case-insensitive)
      if (character.acceptedNames.some(name => guess === name.toLowerCase())) {
        correctGuesses++;
        displayPopupMessage(`Correct! You guessed ${character.screenName}.`, 'correct');
        // Move to the next character
        currentIndex++;
        if (currentIndex < shuffledData.length) {
          displayCharacter(shuffledData[currentIndex]);
        } else {
          endGame();
        }
      } else {
        // Show "WRONG" message
        displayPopupMessage("WRONG", 'wrong');
      }
    }

    // Function to skip the current character
    function skipCharacter() {
      currentIndex++;
      if (currentIndex < shuffledData.length) {
        displayCharacter(shuffledData[currentIndex]);
      } else {
        endGame();
      }
    }

    // Function to give up the game
    function giveUp() {
      endGame();
    }

// Function to end the game

function endGame() {
    const endTime = new Date();
    totalTime = (endTime - startTime) / 1000;
    const finalResult = `Game over! You guessed ${correctGuesses} out of ${shuffledData.length} characters in ${totalTime} seconds.`;
    document.getElementById('final-result').innerHTML = finalResult;
    
    document.getElementById('game-over-modal').style.display = 'block'; // Show the game over modal
  
    // Add event listener to the close button
    document.querySelector('.close-button').addEventListener('click', () => {
      // Hide the game over modal, and show the main menu again, also hide the game container
      document.getElementById('game-over-modal').style.display = 'none';
      document.getElementById('start-screen').style.display = 'flex';
      document.getElementById('game-container').style.display = 'none';
    });
  
    // Add event listener to the restart button
    document.getElementById('restart-button').addEventListener('click', () => {
      document.getElementById('game-over-modal').style.display = 'none'; // Hide the modal
      startGame(); // Restart the game
    });
  }

    // Function to display a popup message
    function displayPopupMessage(message, type) {
      const popupMessage = document.createElement('div');
      popupMessage.className = `popup-message ${type}-message`;
      popupMessage.innerText = message;
      document.body.appendChild(popupMessage);
      popupMessage.style.display = 'block'; // Show the popup message

      setTimeout(() => {
        popupMessage.remove();
      }, 2000); // Remove the popup message after 2 seconds
    }

    // Function to restart the game
    function restartGame() {
      document.getElementById('game-over-modal').style.display = 'none'; // Hide the modal
      startGame(); // Restart the game by calling startGame again
    }

    // Initially hide the game over modal
    document.getElementById('game-over-modal').style.display = 'none';
  });