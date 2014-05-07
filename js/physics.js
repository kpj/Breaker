var lastTick = Date.now();


function circleLineIntersect(
	x1, y1, 
	x2, y2, 
	cx, cy, cr
	) {
	/*
	 * Checks for an intersection of the line and circle
	 */
		var dx = x2 - x1;
		var dy = y2 - y1;
		var a = dx * dx + dy * dy;
		var b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
		var c = cx * cx + cy * cy;
		c += x1 * x1 + y1 * y1;
		c -= 2 * (cx * x1 + cy * y1);
		c -= cr * cr;
		var bb4ac = b * b - 4 * a * c;

		if(bb4ac < 0) {
			return false;
		} else {
			return true;
		}
	}

function findCollision(brick_x, brick_y, ball) {
	/*
	 * returns -1 on no collision
	 * 1-4 on collision
	*/

	if(
		ball.x + ball.radius > brick_x &&
		ball.y + ball.radius > brick_y &&
		ball.x - ball.radius < brick_x + brickWidth &&
		ball.y - ball.radius < brick_y + brickHeight
	) {
		if(circleLineIntersect(brick_x, brick_y, brick_x + brickWidth, brick_y, ball.x, ball.y, ball.radius)) {
			// top
			return 1;
		} else if(circleLineIntersect(brick_x + brickHeight, brick_y + brickHeight, brick_x + brickWidth + brickHeight, brick_y + brickHeight, ball.x, ball.y, ball.radius)) {
			// bottom
			return 2;
		} else if(circleLineIntersect(brick_x, brick_y, brick_x, brick_y + brickHeight, ball.x, ball.y, ball.radius)) {
			// left
			return 3;
		} else if(circleLineIntersect(brick_x + brickWidth, brick_y, brick_x + brickWidth, brick_y + brickHeight, ball.x, ball.y, ball.radius)) {
			// right
			return 4;
		}
	}

	return -1;
}

function simulate(world) {
	var delta = Date.now() - lastTick;

	var prev_x = world.ball.x;
	var prev_y = world.ball.y;

	var reset = false; // recompute ball position at end of this iteration

	// move ball
	world.ball.x += world.ball.vx * delta/200;
	world.ball.y += world.ball.vy * delta/200;

	// find collisions with bricks
	for(var r in world.field) {
		var row = world.field[r];

		for(var c in row) {
			var ele = row[c];

			if(ele) {
				var res = findCollision(c * brickWidth, r * brickHeight, world.ball);

				if(res != -1) {
					ele.onCollision(c, r, res);

					switch(res) {
						case 1:
							world.ball.vy *= -1;
							break;
						case 2:
							world.ball.vy *= -1;
							break;
						case 3:
							world.ball.vx *= -1;
							break;
						case 4:
							world.ball.vx *= -1;
							break;
					}
				}
			}
		}

		reset = true;
	}

	// check paddle
	var res = findCollision(world.paddle.x, world.paddle.y, world.ball);
	if(res != -1) {
		switch(res) {
			case 1:
				if(
					(world.ball.vx > 0 && world.ball.x < world.paddle.x + brickWidth/2) ||
					(world.ball.vx < 0 && world.ball.x > world.paddle.x + brickWidth/2)
				)
					world.ball.vx *= -1;
				world.ball.vy *= -1;
				break;
			case 2:
				world.ball.vy *= -1;
				break;
			case 3:
				world.ball.vx *= -1;
				break;
			case 4:
				world.ball.vx *= -1;
				break;
		}

		reset = true;
	}

	// check world borders
	if(world.ball.x + world.ball.radius > $('#world').width()) {
		world.ball.vx *= -1;
		reset = true;
	}
	if(world.ball.x - world.ball.radius < 0) {
		world.ball.vx *= -1;
		reset = true;
	}
	if(world.ball.y - world.ball.radius < 0) {
		world.ball.vy *= -1;
		reset = true;
	}
	if(world.ball.y + world.ball.radius > $('#world').height()) {
		alert('noob');
		world.ball.y = -10000000;
		reset = false;
	}


	// reset old and do new movement (if needed)
	if(reset) {
		world.ball.x = prev_x;
		world.ball.y = prev_y;
		world.ball.x += world.ball.vx * delta/200;
		world.ball.y += world.ball.vy * delta/200;
	}

	lastTick = Date.now();
}