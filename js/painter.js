function drawBricks(field) {
	for(var r in field) {
		var row = field[r];

		for(var c in row) {
			var ele = row[c];

			if(ele) {
				ctx.fillStyle = ele.color;
				ctx.fillRect(c * brickWidth, r * brickHeight, brickWidth, brickHeight);

				ctx.strokeStyle = '#ffffff';
				ctx.strokeRect(c * brickWidth, r * brickHeight, brickWidth, brickHeight);
			}
		}
	}
}

function drawBall(ball) {
	ctx.beginPath();
	ctx.strokeStyle = ball.color;
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
	ctx.stroke();
}

function drawWorld(world) {
	// draw background
	ctx.fillStyle = world.backgroundColor;
	ctx.rect(0, 0, $('#world').width(), $('#world').height());
	ctx.fill();

	// draw bricks
	drawBricks(world.field);

	// draw paddle
	world.paddle.draw();

	// draw ball
	for(var p in world.balls) {
		world.balls[p].draw();
	}
}