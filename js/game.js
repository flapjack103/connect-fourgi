'use strict';

// Connect Four game object
// Handles complete gameplay and UI stuff
var C4Game = function(rows, cols) {

	// Create a new Connect Four object
	var c4 = new ConnectFour(rows, cols);

	// Define board width by num of cols & rows
	$('#board').css({'width' : cols * 80,
					 'height' : rows * 80});
	
	// Initialize the board on the DOM
	this.init = function() {

		// Init the 2d array board
		c4.initBoard();

		// Clear any existing board
		$('#board').html('');

		// Update Score
		$('#p1-score').html(c4.player1.score);
		$('#p2-score').html(c4.player2.score);

		// Draw the board on the DOM
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < cols; j++) {
				// Create a list element representing a slot
				var $li = $("<li>", {id: i+"-"+j, class: "circle empty"});

				// Add event handler to play move on click
				(function() {
					var col = j;
					$li.click(function(event) { 
						onColSelect(col);
					});
				}());

				// Draw on the board
				$('#board').append($li);
			}
		}
		// Show the next chip to drop
		showNewChip();
	}

	this.getPlayerName = function(player) {
		return (player === '1' ? c4.player1.name : c4.player2.name);
	}

	this.setPlayerName = function(player, name) {
		if(player === '1') {
			c4.player1.name = name;
			$('#p1').html(name);
		}
		else if(player === '2') {
			c4.player2.name = name;
			$('#p2').html(name);
		}
	}

	function onColSelect(col) {
		$(document).unbind('mousemove');
		var color = c4.currentPlayer.color;
		var row;

		// Play move and see if we get an error
		try {
			row = c4.playMove(col);
		} catch(err) {
			showAlert(err);
			$(document).on('mousemove', followMe);
			return;
		}

		// Drop the chip
		animateDrop(row, col, function() {
			//Place chip permanently, hide the temp
			placeChip(row, col);
			$('#new-chip').hide();

			// Check for winning move
			if(c4.isWinningMove(row, col)) {
				c4.currentPlayer.score++;
				endGame(c4.currentPlayer);
				return;
			}

			// Check if board is full
			if(c4.isBoardFull()) {
				endGame(null);
				return;
			}

			// Next player's move
			c4.switchPlayer();
			showNewChip();
		});
	}


	// Sets CSS and handlers for the new chip to drop
	function showNewChip() {
		var newChip = $('#new-chip');
		newChip.removeClass();

		// Set appropriate color for player
		newChip.addClass(c4.currentPlayer.color);

		// Move it back to the top of the board
		newChip.css('top', '75px');

		// Attach event handler
		$(document).on('mousemove', followMe);
		newChip.show();
	}

	// Fix permanent chip, update the board
	function placeChip(row, col, color) {
		var slotID = '#' + row + '-' + col;

		// Color the slot
		$(slotID).removeClass('empty');
		$(slotID).addClass(c4.currentPlayer.color);

	}

	// Show players a message
	function showAlert(msg) {
		alert(msg);
	}

	// Handler for div to follow mouse movement
	function followMe(e) {
		// Define the chip boundary
		var xMin = 210;
		var xMax = 210 + (80*(cols-1));
		if( e.pageX > xMin && e.pageX < xMax) {
		    $('#new-chip').css({
		       left:  e.pageX - 50
		    });
		}
		else if( e.pageX > xMax) {
			 $('#new-chip').css({
		       left:  xMax - 50
		    });
		}
		else if( e.pageX < xMin) {
			$('#new-chip').css({
		       left:  xMin - 50
		    });
		}
	}

	// Animate the chip
	function animateDrop(row, col, onFinish) {
		var positionStart = $('#' + 0 + '-' + col).position();
		var positionEnd = $('#' + row + '-' + col).position();

		// animate drop
	    $('#new-chip').css({
	            left: positionStart.left
	        }).animate({
	            left: positionEnd.left,
	            top: positionEnd.top
	        }, 300, onFinish);
	}

	// Show results
	function endGame(winner) {
		var msg = winner === null ? 'No contest.' : '<span class="' + winner.color + '-font">' + winner.name + '</span> is the winner!'
		$('#end-game-msg').html(msg);
	    $('#end-game').show();
	}
};
