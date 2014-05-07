function handleControls(dir) {
	if(dir.left)
		world.paddle.move(-5);
	if(dir.right)
		world.paddle.move(5);
}