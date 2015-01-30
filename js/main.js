'use strict';

// Create a new connect four game (row, col)
var game = new C4Game(6, 7);

// Fake list of top ranking players
var topPlayers = [	{'name' : 'Queen Elizabeth', 'score':'9999'}, 
					{'name' : 'Thorgi', 'score' : '52'},
					{'name' : 'Player 1', 'score' : '48'},
					{'name' : 'Mr. Biscuits', 'score' : '35'},
					{'name' : 'c0rg1s4evrr', 'score' : '26'}
				];

// Build ranking table
for(var i = 0; i < topPlayers.length; i++) {
	var rowHTML = '<tr><td>' + (i+1) + '</td>';
	rowHTML += '<td>' + topPlayers[i].name + '</td>';
	rowHTML += '<td>' + topPlayers[i].score + '</td></tr>';
	$('#top-table > tbody:last').append(rowHTML);
}

// Set up all event handlers
$('#new-game').click(function(e) {
	$('#end-game').hide();
	$( "#game li" ).each(function() {
		// animate drop
    	$(this).css({
            opacity: 1
        }).animate({
        	opacity: 0,
        }, 800, function() {
        	game.init();
        });
	});
});

$('#restart').click(function(e) {
	$( "#game li" ).each(function() {
		// animate drop
    	$(this).css({
            opacity: 1
        }).animate({
        	opacity: 0,
        }, 800, function() {
        	game.init();
    	});
	});
});

$('#ranking').click(function(e) {
	$('#ranking-box').show();
});

$('#about').click(function(e) {
	$('#about-box').show();
})

// Show/hide speech bubble on hover
$('#about').hover(	function() { $('#bubble').show()}, 
					function() { $('#bubble').hide()}
				);


// Allow double click for changing player names
$( "#p1" ).dblclick(function() {
	$('#name-input').val(game.getPlayerName('1'));
	$('#player-num').html('1');
  	$('#name-box').show();
  	$('#name-input').focus();
});

$( "#p2" ).dblclick(function() {
	$('#name-input').val(game.getPlayerName('2'));
	$('#player-num').html('2');
	$('#name-box').show();
	$('#name-input').focus();
});

// Validate new name and save
$('#save-name').click(function(e) {
	var newName = $('#name-input').val();
	var playerNum = $('#player-num').html();

	if(newName.length > 0) {
		// if name is too long, take first 20 chars
		newName = newName.length > 20 ? newName.slice(0,20) : newName;
		game.setPlayerName(playerNum, newName.slice(0,20));
		$('#name-box').hide();
		$('#name-input').val('');
	}
});

// Close button for all boxes
$('.close').click(function(e) {
	$('#' + this.offsetParent.id).hide();
});

// Init the game 
(function(){
	game.init();
})();