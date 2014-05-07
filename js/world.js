var Ball = function(xPos, yPos, xVelo, yVelo) {
	var me = this;

	this.color = '#000000';
	this.radius = 4;

	this.x = xPos;
	this.y = yPos;

	this.vx = xVelo;
	this.vy = yVelo;

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
	};
}

var Paddle = function() {
	var me = this;

	this.color = '#00ffff';

	this.x = 0;
	this.y = -1;

	this.move = function(d) {
		this.x += d;
	};

	this.draw = function() {
		ctx.fillStyle = me.color;
		ctx.fillRect(me.x, me.y, brickWidth, brickHeight);
	}
}

var World = function() {
	var me = this;

	this.field = [];

	this.backgroundColor = '#ffffff';

	this.balls = [];
	this.paddle = new Paddle();

	this.removeBrick = function(x, y) {
		me.field[y][x] = undefined;
	};
}