function handleControls(pm) {
	if(pm.left && world.paddle.x > 0)
		world.paddle.move(-pm.speed);
	if(pm.right && world.paddle.x + brickWidth < $('#world').width())
		world.paddle.move(pm.speed);
}