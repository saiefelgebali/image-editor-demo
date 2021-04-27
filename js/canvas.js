import {
	handleCanvasImageLoad,
	handleCanvasImageZoom,
	handleMoveImage,
} from "./canvas_image.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const initCanvasDimensions = {
	x: 0,
	y: 0,
	width: 600,
	height: 800,
};

// #region [IMAGE DRAG EVENT LISTENERS]
let isMouseDown = false;
canvas.addEventListener("mousedown", (e) => {
	// Handle start of drag
	isMouseDown = true;
});

let origin;
let offset;
window.addEventListener("mousemove", (event) => {
	// Ensure canvas is being dragged
	if (!isMouseDown) {
		origin = null;
		return;
	}

	// Set origin to first point mouse is down
	if (!origin) {
		origin = { x: event.x, y: event.y };
	}

	// Calculate offset
	offset = {
		x: event.x - origin.x,
		y: event.y - origin.x,
	};

	moveImage(offset);
});

window.addEventListener("mouseup", (e) => {
	// Handle end of drag
	isMouseDown = false;
	endMoveImage();
});
// #endregion

// #region [EDIT CANVAS IMAGE FUNCTIONS]

// The original image file on display
// is stored in this variable
let currentImage;
let currentDimensions;
let tempDimensions;

export function copyImageToCanvas(source) {
	// Create a new Image instance
	// to be copied onto the canvas
	const image = new Image();

	image.onload = () => {
		currentImage = image;
		currentDimensions = handleCanvasImageLoad(
			image,
			canvas,
			ctx,
			initCanvasDimensions
		);
	};

	image.src = source;
}

export function zoomCanvasImage(value) {
	currentDimensions = handleCanvasImageZoom(
		currentImage,
		canvas,
		ctx,
		currentDimensions,
		value
	);
}

export function moveImage(offset) {
	tempDimensions = handleMoveImage(
		currentImage,
		canvas,
		ctx,
		currentDimensions,
		offset
	);
}

export function endMoveImage() {
	currentDimensions = tempDimensions;
}
// #endregion
