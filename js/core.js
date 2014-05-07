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
		[new SimpleBlock(), new MultiBallBlock(), new MultiBallBlock(), new SimpleBlock(), new SimpleBlock()],
		[new MultiBallBlock(), undefined, undefined, undefined, new MultiBallBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new MultiBallBlock(), undefined, undefined, undefined, new MultiBallBlock()],
		[new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock()]
	]);
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

	$('#world').on('touchstart', function(e) {
		e.preventDefault();
		handleTouch(e.originalEvent.changedTouches[0]);
	});
	$('#world').on('touchmove', function(e) {
		e.preventDefault();
		handleTouch(e.originalEvent.changedTouches[0]);
	});
	$('#world').on('touchend', function(e) {
		e.preventDefault();

		paddle_movement.speed = 7;
		paddle_movement.left = false;
		paddle_movement.right = false;
	});
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

function addBall(x, y, vx, vy) {
	world.balls.push(new Ball(x, y, vx, vy));
}