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

	ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
}

export function clipImageDimensions(image, targetWidth) {
	// Preserve image aspect ratio
	// Resize image to desired target width

	const aspectRatio = image.width / image.height;

	const targetHeight = targetWidth / aspectRatio;

	return { targetWidth, targetHeight };
}
