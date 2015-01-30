// Runs all unit tests
// Dependencies: mocha.js, chai.js, mocha.css

var expect = chai.expect;
var rows = 6;
var cols = 7;
var c4 = new ConnectFour(rows, cols);

describe("Connect Four Game", function() {
  describe("possible wins", function() {
    it("should detect vertical win", function() { 
      // init empty board, fill up one column
      c4.initBoard();
     
      for(var i = 0; i < 4; i++)
        c4.playMove(3);

      var row = c4.playMove(3);
      var result = c4.isWinningMove(row, 3);
      expect(result).to.equal(true);
    });

    it("should detect horizontal win", function() { 
      // init empty board, put 1 chip in each col
      c4.initBoard();
      for(var i = 0; i < 4; i++)
        c4.playMove(i);

      var row = c4.playMove(4);
      var result = c4.isWinningMove(row, 4);
      expect(result).to.equal(true);
    });

    it("should detect diagonal win (upward slant)", function() { 
      // init empty board, put 1 chip in each col
      c4.initBoard();
      c4.playMove(1);

      c4.switchPlayer();
      c4.playMove(2);
      c4.playMove(3);
      c4.playMove(4);

      c4.switchPlayer();
      c4.playMove(2);

      c4.switchPlayer();
      c4.playMove(3);
      c4.playMove(4);

      c4.switchPlayer();
      c4.playMove(3);

      c4.switchPlayer();
      c4.playMove(4);

      c4.switchPlayer();
      var row = c4.playMove(4);
      var result = c4.isWinningMove(row, 4);
      expect(result).to.equal(true);
    });

    it("should detect diagonal win (downward slant)", function() { 
      // init empty board, put 1 chip in each col
      c4.initBoard();
      c4.playMove(4);

      c4.switchPlayer();
      c4.playMove(1);
      c4.playMove(2);
      c4.playMove(3);

      c4.switchPlayer();
      c4.playMove(3);

      c4.switchPlayer();
      c4.playMove(1);
      c4.playMove(2);

      c4.switchPlayer();
      c4.playMove(2);

      c4.switchPlayer();
      c4.playMove(1);

      c4.switchPlayer();
      var row = c4.playMove(1)
      var result = c4.isWinningMove(row, 1);
      expect(result).to.equal(true);
    });
  });
  describe("other scenarios", function() {
     it("should successfully check when board is full", function() { 
      c4.initBoard();

      for(var i = 0; i < cols; i++) {
        for(var j =0; j < rows; j++) {
          c4.playMove(i);
        }
      }
      expect(c4.isBoardFull()).to.equal(true);
    });

     it("should throw error when chip is played in full column", function() { 
      c4.initBoard();

      for(var i =0; i < rows; i++) {
        c4.playMove(3);
      }
      expect(function() {
        c4.playMove(3)}).to.throw(Error);
    });
  });
});









