import {
	handleCanvasImageLoad,
	handleCanvasImageZoom,
} from "./canvas_image.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const state = {};

// Initial Canvas Setup
function handleCanvasSetup(canvas, ctx) {
	state.canvas = canvas;
	state.maxWidth = canvas.width;
	state.maxHeight = canvas.height;
	state.ctx = ctx;
}
handleCanvasSetup(canvas, ctx);

// Zoom image
function handleZoomImage(state) {
	// Zoom clip range -  lower value = more zoom
	const zoomRange = 200;

	// Access slider DOM element
	const slider = document.getElementById("slider");

	// Ensure slider on value 0
	slider.value = 0;

	// Handle zoom on input
	slider.addEventListener("input", (event) => {
		const zoom = event.target.value / zoomRange;
		state.zoom = zoom;
		handleCanvasImageZoom(state);
	});
}
handleZoomImage(state);

export function copyImageToCanvas(source) {
	// Create a new Image instance
	// to be copied onto the canvas
	const image = new Image();

	image.onload = () => {
		state.image = {};
		state.image.original = image;
		handleCanvasImageLoad(state);
	};

	image.src = source;
}
