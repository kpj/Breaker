function handleControls(dir) {
	if(dir.left)
		world.paddle.move(-7);
	if(dir.right)
		world.paddle.move(7);
}