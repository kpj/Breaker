/*
 * Initialize everything
 */
$(function () {
	// do canvas stuff
	ctx = $('#world')[0].getContext('2d');

	$('#world')[0].width = $('#content').width();
	$('#world')[0].height = $('#content').height();

	// create game world
	world = new World();

	setLevel([
		[new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock()]
	]);

	// start game
	window.setInterval(tick, 20);
});

/*
 * Heart beat of our world
 */
function tick() {
	simulate(world);

	ctx.clearRect(0, 0, $('#content').width(), $('#content').height());
	drawWorld(world);

	handleControls(paddle_movement);
}

/*
 * Handle controller
 */
var paddle_movement = {
	left: false,
	right: false
}
$(document).keydown(function(e) {
	if(e.keyCode == 65) {
		// [A]
		paddle_movement.left = true;
	} else if(e.keyCode == 68) {
		// [D]
		paddle_movement.right = true;
	}
});
$(document).keyup(function(e) {
	if(e.keyCode == 65) {
		// [A]
		paddle_movement.left = false;
	} else if(e.keyCode == 68) {
		// [D]
		paddle_movement.right = false;
	}
});

/*
 * Administrative stuff
 */
function setLevel(level) {
	world.field = level;

	brickWidth = $('#world').width() / getMaxSubListLength(world.field);
	brickHeight = 30;

	world.paddle.y = $('#world').height() - brickHeight - 1;
}