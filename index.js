// Import npm packages
const prompt = require('prompt-sync')();
const randomWords = require('random-words');
const randomWord = randomWords();

// Singleton implementation (user life points)
class State {
    constructor() {
        this.userLives()
        State.instance = this
    }

    static getInstance() {
        if (!State.instance) {
            State.instance = new State()
        }
        return State.instance
    }

    userLives(lives) {
        this.lives = 10
    }
}

// Whitespaces so the console looks better
const whiteSpace = " ";

// Greeting
const welcomeText = "Welcome to Hangman.";
// Log the greeting with whitespaces
console.log(welcomeText);
console.log(whiteSpace);
console.log(whiteSpace);

// The random word in an array
let charResult = [];
for (i = 0; i < randomWord.length; i++) {
    var characters = randomWord.charAt(i);
    charResult.push(characters);
}

// Game area display
let area = [];
for (j = 0; j < randomWord.length; j++) {
    area.push("_");
}

// Use if in development
// -- console.log(charResult);
// Log the game area for the user
console.log(area);

// Set the win state to false
let win = false;

// Lives of the player (points)
const state = State.getInstance()
state.userLives()

// While the win state is false
while (win == false) {

    // Game starts
    // User life point deduction function
    function loseLife() {
        state.lives -= 1;
    }

    if (state.lives > 0) {

        // User input
        const userInput = prompt('Take a guess... ');

        // Log whitespaces
        console.log(whiteSpace);
        console.log(whiteSpace);

        // If the user inputs more than one character
        if (userInput.length > 1) {
            // If the input matches the randomized word
            if (userInput == randomWord) {
                console.log("You guessed it right!");
                console.log("Game over...");
                win = true;
                break;

                // If the user wants to exit
            } else if (userInput == "exit") {
                console.log("Request received. Exiting game...");
                console.log("The word was: " + randomWord + ".");
                break;

                // If the input doesn't match the randomized word
            } else {
                console.log("You guessed it wrong... :(");
                loseLife()
                console.log("Removed 1 life. Current amount of lives: " + state.lives);
            }
            // If the user inputs one character
        } else {
            let correct = false;

            // Checks every array index for the character provided by the user
            for (k in charResult) {
                if (userInput == charResult[k]) {
                    correct = true;
                    console.log("You guessed a character right!!!");
                    area.splice(k, 1, charResult[k])
                    console.log(area);
                }
            }

            // Removes a life point if the user doesn't guess the right character
            if (!correct) {
                loseLife()
                console.log("This character is not present in this word.");
                console.log("Removed 1 life. Current amount of lives: " + state.lives);
            }

            // If area doesn't include a _ (a game tile), the player has won
            if (!area.includes("_")) {
                console.log("YOU WON! CONGRATULATIONS!!!");
                console.log("Exiting game...")
                break;
            }
        }
        // If the player runs out of lives
    } else {
        console.log("You are out of lives.");
        console.log("The word was: " + randomWord + ".");
        break;
    }
}