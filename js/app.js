import { copyImageToCanvas, zoomCanvasImage } from "./canvas.js";

const imgInput = document.getElementById("img-input");

imgInput.addEventListener("change", (e) => {
	// Handle image input
	// Create image url reference
	// Copy image onto canvas

	// Access input files
	const files = e.target.files;

	// Validate file input
	if (!files || !files.length) {
		return;
	}

	const targetFile = files[0];

	// Create image URL object
	// Pass url to be copied onto canvas
	const image = URL.createObjectURL(targetFile);
	copyImageToCanvas(image);
});

const slider = document.getElementById("slider");

slider.addEventListener("input", (e) => {
	// Access slider input
	const value = e.target.value;

	// Apply canvas edit
	zoomCanvasImage(value);
});
