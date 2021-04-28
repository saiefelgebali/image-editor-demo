export function handleMouseMoveImage(target, container, editor) {
	// Handle user with mouse input to move image
	let mouseDown = false;
	let originX;
	let originY;
	let offsetX;
	let offsetY;

	target.addEventListener("mousedown", (event) => {
		mouseDown = true;
		originX = event.pageX;
		originY = event.pageY;
	});

	container.addEventListener("mousemove", (event) => {
		if (!mouseDown) return;
		offsetX = event.pageX - originX;
		offsetY = event.pageY - originY;
		editor.moveImage(offsetX, offsetY);
	});

	container.addEventListener("mouseup", (event) => {
		if (!mouseDown) return;
		mouseDown = false;
		originX = null;
		originY = null;
		editor.endMoveImage(offsetX, offsetY);
	});
}

export function handleTouchMoveImage(target, container, editor) {
	// Handle user with touch input to move image
	let isTouching = false;
	let originX;
	let originY;
	let offsetX;
	let offsetY;

	target.addEventListener("touchstart", (event) => {
		isTouching = true;
		originX = event.touches[0].screenX;
		originY = event.touches[0].screenY;
		console.log(originX, originY);
	});

	container.addEventListener("touchmove", (event) => {
		event.preventDefault();
		if (!isTouching) return;
		offsetX = event.touches[0].screenX - originX;
		offsetY = event.touches[0].screenY - originY;
		editor.moveImage(offsetX, offsetY);
	});

	container.addEventListener("touchend", (event) => {
		if (!isTouching) return;
		isTouching = false;
		originX = null;
		originY = null;
		editor.endMoveImage(offsetX, offsetY);
	});
}
