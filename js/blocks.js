var SimpleBlock = function() {
	this.color = '#ff0000';

	this.onCollision = function(x, y, side) {
		world.removeBrick(x, y);
	}
}