import { handleCanvasImageLoad } from "./canvas_image.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const initCanvasDimensions = {
	width: 600,
	height: 800,
};

export function copyImageToCanvas(source) {
	// Create a new Image instance
	// to be copied onto the canvas
	const image = new Image();

	image.onload = () =>
		handleCanvasImageLoad(image, canvas, ctx, initCanvasDimensions);

	image.src = source;
}
