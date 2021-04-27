// Control how much zoom is allowed
// Higher value means lower zoom range
const ZOOM_DENOMINATOR = 200;

export function handleCanvasImageLoad(image, canvas, ctx, { width, height }) {
	// Setup maximum dimensions
	const maxWidth = width;
	const maxHeight = height;

	// Resize image so it is equal to the canvas width (maxWidth)
	// and retain original aspect ratio
	const { targetWidth, targetHeight } = clipImageDimensions(image, maxWidth);

	// Resize canvas height to match new image height
	// Ensure canvas does not exceed a maximum height
	canvas.height = targetHeight > maxHeight ? maxHeight : targetHeight;

	// Image position
	const targetX = 0,
		targetY = 0;

	ctx.drawImage(image, targetX, targetY, targetWidth, targetHeight);

	// Return image dimensions
	return {
		x: targetX,
		y: targetY,
		width: targetWidth,
		height: targetHeight,
	};
}

export function handleCanvasImageZoom(image, canvas, ctx, current, zoom) {
	// Clip zoom range
	zoom = zoom / ZOOM_DENOMINATOR;

	// Resize image
	const { targetWidth, targetHeight } = clipImageDimensions(
		image,
		image.width * zoom + canvas.width
	);
	ctx.drawImage(image, current.x, current.y, targetWidth, targetHeight);

	// Return new image dimensions
	current.width = targetWidth;
	current.height = targetHeight;
	return current;
}

export function handleMoveImage(image, canvas, ctx, current, offset) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const targetX = current.x + offset.x;
	const targetY = current.y + offset.y;

	ctx.drawImage(image, targetX, targetY, current.width, current.height);

	return {
		x: targetX,
		y: targetY,
		width: current.width,
		height: current.height,
	};
}

function clipImageDimensions(image, targetWidth) {
	// Preserve image aspect ratio
	// Resize image to desired target width

	const aspectRatio = image.width / image.height;

	const targetHeight = targetWidth / aspectRatio;

	return { targetWidth, targetHeight };
}
