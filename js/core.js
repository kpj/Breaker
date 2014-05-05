$(function () {
	// do canvas stuff
	ctx = $('#world')[0].getContext('2d');

	$('#world')[0].width = $('#content').width();
	$('#world')[0].height = $('#content').height();

	// create game world
	world = new World();

	blockWidth = $('#world').width() / getMaxSubListLength(world.field);
	blockHeight = 30;

	// start game
	window.setInterval(tick, 20);
});

function tick() {
	simulate(world);
	ctx.clearRect(0, 0, $('#content').width(), $('#content').height());
	drawWorld(world);
}

$(document).keypress(function(e) {
	if(e.keyCode == 97) {
		// [A]
		world.paddle.move(-10);
	} else if(e.keyCode == 100) {
		// [D]
		world.paddle.move(10);
	}
});