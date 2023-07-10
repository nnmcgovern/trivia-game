# trivia-game

This application is a browser trivia game created using HTML, CSS, and vanilla JavaScript. It also uses data from the [Open Trivia Database API](https://opentdb.com/api_config.php).

# Start
<img width="720" alt="start-screen" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/af77fdb2-7e77-4f23-b037-92f74d0c68e7">
<br></br>
The start screen displays the game's title and a button that will start the game when clicked.

# Categories & Question Examples
<img width="720" alt="categories-screen" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/a396009f-5346-4d4c-84ca-a52187f4e4e0">
<br></br>
To begin, the user is prompted to select a question category.
<br></br>
<img width="720" alt="question-example" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/9f1448d5-f0fa-4a4a-b57a-1ac0d95aa66f">
<br></br>
After a category has been selected, a request is made to the API for a question of the chosen category. Once the API responds, the question as well as four possible answers are displayed.
<br></br>
<img width="720" alt="correct-answer-example" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/36f163e8-eb11-476c-a314-76800248cc34">
<br></br>
If the user selects the correct answer, a modal appears with the text "Correct!" and a button to continue. Clicking the button will prompt the user to select a category again.
<br></br>
<img width="720" alt="incorrect-answer-example" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/9d7b836c-1944-4f4f-ad64-551288328761">
<br></br>
If the user selects an incorrect answer, a modal appears with the text "Incorrect!" as well as the correct answer and the user's remaining hearts.

# Hearts
<img width="478" alt="hearts" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/823e5c0c-54a2-4ca0-a738-cf3383fcc703">
<br></br>
The user begins the game with five hearts. For every question the user answers incorrectly, one heart is lost. The game ends once the user has depleted all of their hearts.

# Game Over
<img width="720" alt="game-over-screen" src="https://github.com/nnmcgovern/trivia-game/assets/48661257/c6393235-0913-4562-a4ba-13a32132e4bb">
<br></br>
Once the user has run out of hearts, the game over screen appears with the text "Game Over!" Also displayed is the number of questions the user answered correctly out of the total number of questions that appeared during the game. Clicking the button marked "Play again?" will reload the page, taking the user back to the starting screen to begin the game again.









