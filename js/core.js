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

	setLevel(genLevel(20, 5));
	addBall(
		world.paddle.x + brickWidth/2,
		world.paddle.y - brickHeight,
		Math.random() * 80 - 40,
		Math.random() * 60 + 20
	);

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
$(function () {
	paddle_movement = {
		left: false,
		right: false,
		speed: 7
	}

	$(document).keydown(function(e) {
		if(e.keyCode == 65) {
			// [A]
			paddle_movement.left = true;
		} else if(e.keyCode == 68) {
			// [D]
			paddle_movement.right = true;
		}

		paddle_movement.speed = 7;
	});
	$(document).keyup(function(e) {
		if(e.keyCode == 65) {
			// [A]
			paddle_movement.left = false;
		} else if(e.keyCode == 68) {
			// [D]
			paddle_movement.right = false;
		}

		paddle_movement.speed = 7;
	});

	function handleTouch(touch) {
		var middle = $('#world').position().left + $('#world').width()/2;
		var diff = middle - touch.pageX;

		paddle_movement[(diff > 0) ? 'left' : 'right'] = true;
		paddle_movement[(diff < 0) ? 'left' : 'right'] = false;
		paddle_movement.speed = Math.abs(diff)/10;
	}

	$(document).on('touchstart', function(e) {
		e.preventDefault();
		handleTouch(e.originalEvent.changedTouches[0]);
	});
	$(document).on('touchmove', function(e) {
		e.preventDefault();
		handleTouch(e.originalEvent.changedTouches[0]);
	});
	$(document).on('touchend', function(e) {
		e.preventDefault();

		paddle_movement.speed = 7;
		paddle_movement.left = false;
		paddle_movement.right = false;
	});
});

/*
 * Administrative stuff
 */
function genLevel(w, h) {
	var level = [];

	for(var y = 0 ; y < h ; y++) {
		level.push([]);
		for(var x = 0; x < w ; x++) {
			level[y].push(
				new window[randomElement(['SimpleBlock', 'MultiBallBlock'])]()
			);
		}
	}

	return level;
}
function setLevel(level) {
	world.field = level;

	brickWidth = $('#world').width() / getMaxSubListLength(world.field);
	brickHeight = 20;

	world.paddle.y = $('#world').height() - brickHeight - 1;
}

function addBall(x, y, vx, vy) {
	world.balls.push(new Ball(x, y, vx, vy));
}