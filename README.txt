*** Connect Four Game ***


** Overview **

Description: A connect four game which can be played locally by two people. 

To play: Open the index.html page with your browser.

Testing: To run unit tests, open test.html with your browser.

Libraries: jQuery for the game, mocha and chai for unit testing.


** Implementation Details **

There are three main files for the game:

* connectfour.js handles all the game mechanics, such as creating a 2D array for the board, placing pieces into this board, and checking for wins, ties, and invalid moves. 

* game.js ties the game mechanics to the DOM. It draws the board, draws the chips, and is responsible for game flow.

* main.js inits the game. It also attaches event handlers to other DOM objects unrelated to the game.