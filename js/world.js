var Ball = function(xPos, yPos, xVelo, yVelo) {
	var me = this;

	this.color = '#0000ff';
	this.radius = 10;

	this.x = xPos;
	this.y = yPos;

	this.vx = xVelo;
	this.vy = yVelo;

	this.draw = function() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.stroke();
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
		ctx.strokeStyle = me.color;
		ctx.strokeRect(me.x, me.y, brickWidth, brickHeight);
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