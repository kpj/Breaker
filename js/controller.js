function handleControls(pm) {
	if(pm.left)
		world.paddle.move(-pm.speed);
	if(pm.right)
		world.paddle.move(pm.speed);
}