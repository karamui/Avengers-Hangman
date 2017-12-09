/* ------------------------------------ GLOSSARY

alreadyguessed - incorrect letters which have already been guessed (document)
character - current character (randomly selected)
characterArray - list of characters
correctAnswer - correct answer array for comparison purposes
currentGuess - user's progress towards guessing the current word
currentword - current word (letters, blanks, hyphens, periods) (document)
i - index 
imageSource - source links for images 
img - image variable
guesses - number of guesses remaining
guessflag - triggered when user guesses a correct letter (false -> true)
guesscount - number of guesses remaining (document)
letterArray - array containing all incorrect letters guessed by user
selector - index number of randomly chosen character
win - number of games won
wincount - win counter (document) */

// ------------------------------------ declaring global variables

var characterArray = ["Black Panther", "Stan Lee", "Falcon", "The Vision", "Scarlet Witch", "Thor", "Captain America", "Wong", "Iron Patriot", "Nebula", "Hawkeye", "Thanos", "Hulk", "Spider-Man", "Nick Fury", "Groot", "Captain Marvel", "Black Widow", "Odin", "Winter Soldier", "Rocket Raccoon", "Loki", "Drax the Destroyer", "Iron Man", "Maria Hill", "Doctor Strange", "Gamora", "Star-Lord"];
var imageSource = ["assets/images/black-panther.jpg", "assets/images/stan-lee.jpg", "assets/images/falcon.jpg", "assets/images/the-vision.jpg", "assets/images/scarlet-witch.jpg", "assets/images/thor.jpg", "assets/images/captain-america.jpg", "assets/images/wong.jpg", "assets/images/iron-patriot.jpg", "assets/images/nebula.jpg", "assets/images/hawkeye.jpg", "assets/images/thanos.jpg", "assets/images/hulk.jpg", "assets/images/spider-man.jpg", "assets/images/nick-fury.jpg", "assets/images/groot.jpg", "assets/images/captain-marvel.jpg", "assets/images/black-widow.jpg", "assets/images/odin.jpg", "assets/images/winter-soldier.jpg", "assets/images/rocket-raccoon.jpg", "assets/images/loki.jpg", "assets/images/drax-the-destroyer.jpg", "assets/images/iron-man.jpg", "assets/images/maria-hill.jpg", "assets/images/doctor-strange.jpg", "assets/images/gamora.jpg", "assets/images/star-lord.jpg", "assets/images/infinity-war.jpg"]
var i = 0;
var win = 0;

// ------------------------------------ RESET FUNCTION
// declaring and resetting variables for new rounds

function reset() {
	// declaring and resetting variables
	window.correctAnswer = [""];
	window.currentGuess = [""];
	window.guesses = 15;
	window.guessflag = false;
	window.letterArray = [""];
	window.selector = 0;

	// selecting a character 
	window.selector = Math.floor(Math.random() * characterArray.length);
	window.character = characterArray[selector].toUpperCase();
	console.log(character); 

	// creating the correct answer array
	for (i = 0; i < character.length ; i++) {
		if (character[i] == " ") {
			correctAnswer[i] = ".";
		}
		else {
			correctAnswer[i] = character[i]; 
		}
	}

	// concealing the selected character's letters
	for (i = 0; i < character.length; i++) {
		if (character[i] == " ") {
			currentGuess[i] = ".";
		}
		else if (character[i] == "-") {
			currentGuess[i] = "-";
		}
		else {
			currentGuess[i] = "_"; 
		}
	}

	updateScreen();
	
}

// ------------------------------------ HANGMANGAME FUNCTION
// code to make the hangman game work

function hangmanGame() {
	// guessing function
	document.onkeyup = function(userGuess) {
		// user's guess
	    var letter = userGuess.key;
	    var letter = letter.toUpperCase(); // convert to uppercase for comparison     

		// comparing user's guess to character and updating progress and list of letters guessed
		for (i = 0; i < character.length; i++) {
			if (letter == character[i] && letter != currentGuess[i]) {
				currentGuess[i] = letter;
				guessflag = true;
			}
			else if (letter == character[i] && letter == currentGuess[i]) {
				guessflag = true;
			}
		}

		// adjusting number of guesses remaining
		if (guessflag == false) {
			letterArray.push(letter);
			guesses--;
		}
		else {
			guessflag = false;
		}

		// if the user runs out of guesses, they lose the game
		if (guesses == 0) {
			updateScreen();
			setTimeout(delayLose, 100);
		}
		// if the user correctly guesses the character, they win the game and move onto the next character
		if (currentGuess.join(" ") === correctAnswer.join(" ")) {
			win++;
			document.getElementById("charpic").src=imageSource[selector];
			updateScreen();
			setTimeout(delayWin, 100);
		} 

		updateScreen();

		if (win == 50) {
				alert("Why are you so good at this game?");
			}
	}; 
}

// ------------------------------------ UPDATESCREEN FUNCTION
// print win count, current guess, number of guesses remaining, and user's guessed letters to screen

function updateScreen() {
	// pulling text content from document
	var alreadyguessed = document.getElementById("alreadyguessed");
	var currentword = document.getElementById("currentword"); 
	var guesscount = document.getElementById("guesscount");  
	var wincount = document.getElementById("wincount"); 

	// printing to screen
	wincount.textContent = win;
	currentword.textContent = currentGuess.join(" ");
	guesscount.textContent = guesses;
	alreadyguessed.textContent = letterArray.join(" ");
}

// ------------------------------------ DELAYWIN FUNCTION
// delays code so user can appreciate having guessed the correct character

function delayWin() {
	alert("Correct! This character was " + characterArray[selector] + "!");
	reset();
}

// ------------------------------------ DELAYLOSE FUNCTION
// delays code so user can see that they have lost the game
function delayLose() {
	alert("Sorry, you have run out of guesses! You lose!");
	alert("Would you like to try again?");
	location.reload();
}

// ------------------------------------ RUN GAME!

reset();
hangmanGame();