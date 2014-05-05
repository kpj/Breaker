function drawBricks(field) {
	for(var r in field) {
		var row = field[r];

		for(var c in row) {
			var ele = row[c];

			if(ele) {
				ctx.strokeStyle = ele.color;
				ctx.strokeRect(c * blockWidth, r * blockHeight, blockWidth, blockHeight);
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

	// draw ball
	world.ball.draw();

	// draw paddle
	world.paddle.draw();
}