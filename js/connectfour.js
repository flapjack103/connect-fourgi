'use strict';

// Connect Four object
// Defines all game mechanics
var ConnectFour = function(rows, cols) {

	// Helpful 'private' globals
	var filledCols;
	var board
	var that = this;

	// Helpful public globals
	this.currentPlayer;

	// Define the players
	this.player1 = {'name':'Player 1', 'color':'red', 'score':0};
	this.player2 = {'name':'Player 2', 'color':'blue', 'score':0};
	this.player1.next = this.player2;
	this.player2.next = this.player1;

	// Initialize the board as a 2D array
	this.initBoard = function() {
		board = [];
		filledCols = 0;
		this.currentPlayer = this.player1;

		// Create the 2d array for the board
		for(var i = 0; i < rows; i++) {
			board.push([]);
			for(var j = 0; j < cols; j++) {
				board[i][j] = {'color':null};
			}
		}
	}

	// Mark chip in the board by col
	// Throw error if column is full
	// Return row if play succeeds
	this.playMove = function(col) {

		// Get the col we picked, find the next empty row
		var row = findNextEmptyRow(col);

		// If the column is full, return alert
		if(row === null) {
			throw new Error('Not a valid move.');
			return;
		}

		// Update the board
		board[row][col].color = this.currentPlayer.color;

		// Check if we filled up a column
		if(row === 0) {
			filledCols++;
		}

		return row;
	}

	// Check if move creates a win
	this.isWinningMove = function(row, col) {
		console.log(row + ',' + col);
		// Check all possible wins
		if( verticalWin(row,col) ||
			horizontalWin(row,col) ||
			diagonalWin1(row,col) ||
			diagonalWin2(row, col) )
			return true;
		return false;
	}

	// Check if the board is full
	this.isBoardFull = function() {
		if(filledCols == cols)
			return true;
		return false;
	}

	// Next player
	this.switchPlayer = function() {
		this.currentPlayer = this.currentPlayer.next;
	}

	// Returns true/false for 4 chips vertically adjacent
	function verticalWin(row, col) {
		var count = 0;
		for(var i = row; i < rows; i++) {
			var chip = board[i][col];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}

		for(var i = row-1; i >= 0; i--) {
			var chip = board[i][col];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}
		if(count >= 4)
			return true;
		return false;
	}

	// Returns true/false for 4 chips horizontally adjacent
	function horizontalWin(row, col) {
		var count = 0;
		for(var i = col; i < cols; i++) {
			var chip = board[row][i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}

		for(var i = col-1; i >= 0; i--) {
			var chip = board[row][i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}
		if(count >= 4)
			return true;
		return false;
	}

	// Returns true/false for 4 chips diagonally adjacent (downward slant)
	function diagonalWin1(row, col) {
		var count = 0;

		// Because JS is dumb sometimes and tries to concat instead of adding numbers
		row = parseFloat(row);
		col = parseFloat(col);

		for(var i = 1; row+i < rows && col+i < cols; i++) {
			var chip = board[row+i][col+i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}
		for(var i = 0; row-i >= 0 && col-i >= 0; i++) {
			var chip = board[row-i][col-i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}

		if(count >= 4)
			return true;
		return false;
	}

	// Returns true/false for 4 chips diagonally adjacent (upward slant)
	function diagonalWin2(row, col) {
		var count = 0;

		// Because JS is dumb sometimes and tries to concat instead of adding numbers
		row = parseFloat(row);
		col = parseFloat(col);

		for(var i = 1; row+i < rows && col-i >= 0; i++) {
			var chip = board[row+i][col-i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}
		for(var i = 0; row-i >= 0 && col+i < cols; i++) {
			var chip = board[row-i][col+i];
			if(chip.color == that.currentPlayer.color)
				count++;
			else
				break;
		}

		if(count >= 4)
			return true;
		return false;
	}

	// Check if the column is full, from bottom up
	function findNextEmptyRow(col) {
		for(var i = rows - 1; i >= 0; i--) {
			if(board[i][col].color == null)
				return i;
		}
		return null;
	}
};
