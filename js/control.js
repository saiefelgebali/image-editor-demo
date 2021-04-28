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
