$(function () {
	// do canvas stuff
	ctx = $('#world')[0].getContext('2d');

	$('#world')[0].width = $('#content').width();
	$('#world')[0].height = $('#content').height();

	// create game world
	world = new World();

	blockWidth = $('#world').width() / getMaxSubListLength(world.field);
	blockHeight = 30;

	world.paddle.y = $('#world').height() - blockHeight - 1;

	// start game
	window.setInterval(tick, 20);
});

function tick() {
	simulate(world);
	ctx.clearRect(0, 0, $('#content').width(), $('#content').height());
	drawWorld(world);

	// move paddle
	if(move_left) {
		world.paddle.move(-5);
	}
	if(move_right) {
		world.paddle.move(5);
	}
}

var move_left = false;
var move_right = false;
$(document).keydown(function(e) {
	if(e.keyCode == 65) {
		// [A]
		move_left = true;
	} else if(e.keyCode == 68) {
		// [D]
		move_right = true;
	}
});
$(document).keyup(function(e) {
	if(e.keyCode == 65) {
		// [A]
		move_left = false;
	} else if(e.keyCode == 68) {
		// [D]
		move_right = false;
	}
});