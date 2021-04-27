function drawImage(state) {
	if (!state || !state.image) {
		return;
	}

	state.ctx.drawImage(
		state.image.original,
		state.image.x,
		state.image.y,
		state.image.width,
		state.image.height
	);
}

export function handleCanvasImageLoad(state) {
	// Resize image so it is equal to the canvas width (maxWidth)
	// and retain original aspect ratio
	const { targetWidth, targetHeight } = clipImageDimensions(
		state.image.original,
		state.maxWidth
	);

	// Resize canvas height to match new image height
	// Ensure canvas does not exceed a maximum height
	canvas.height =
		targetHeight > state.maxHeight ? state.maxHeight : targetHeight;

	// Update image state
	state.image.x = state.image.y = 0;
	state.image.width = targetWidth;
	state.image.height = targetHeight;

	drawImage(state);
}

export function handleCanvasImageZoom(state) {
	// Resize image depending on zoom value
	const targetWidth = state.zoom * state.maxWidth + state.maxWidth;

	const { targetHeight } = clipImageDimensions(
		state.image.original,
		targetWidth
	);

	// Alter image dimensions
	state.image.width = targetWidth;
	state.image.height = targetHeight;

	drawImage(state);
}

function clipImageDimensions(image, targetWidth) {
	// Preserve image aspect ratio
	// Resize image to desired target width

	const aspectRatio = image.width / image.height;

	const targetHeight = targetWidth / aspectRatio;

	return { targetWidth, targetHeight };
}
