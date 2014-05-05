var Ball = function() {
	var me = this;

	this.color = '#0000ff';
	this.radius = 10;

	this.x = 400;
	this.y = 80;

	this.vx = 10;
	this.vy = 20;

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
		ctx.strokeRect(me.x, me.y, blockWidth, blockHeight);
	}
}

var World = function() {
	var me = this;

	this.field = [
		[new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), undefined, undefined, undefined, new SimpleBlock()],
		[new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock(), new SimpleBlock()]
	];

	this.backgroundColor = '#ffffff';

	this.ball = new Ball();
	this.paddle = new Paddle();

	this.removeBrick = function(x, y) {
		me.field[y][x] = undefined;
	};
}