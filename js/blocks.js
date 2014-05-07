var SimpleBlock = function() {
	this.color = '#ff0000';

	this.onCollision = function(x, y, side) {
		world.removeBrick(x, y);
	}
}

var MultiBallBlock = function() {
	this.color = '#00ff00';

	this.onCollision = function(x, y, side) {
		addBall(
			x * brickWidth + brickWidth/2, y * brickHeight + brickHeight/2,
			Math.random() * 80 - 40,
			Math.random() * 80 - 40
		);

		world.removeBrick(x, y);
	}
}