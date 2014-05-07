var SimpleBlock = function() {
	this.color = '#ff0000';

	this.onCollision = function(x, y, side) {
		world.removeBrick(x, y);
	}
}

var MultiBallBlock = function() {
	this.color = '#0f0f0f';

	this.onCollision = function(x, y, side) {
		addBall(
			x * brickWidth, y * brickHeight,
			Math.random() * 80 - 40,
			Math.random() * 80 - 40
		);

		world.removeBrick(x, y);
	}
}