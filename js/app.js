import ImageEditor from "./ImageEditor.js";
import { handleMouseMoveImage } from "./control.js";

const imgInput = document.getElementById("img-input");
const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");

// Create new ImageEditor instance
const editor = new ImageEditor(canvas);

imgInput.addEventListener("change", (event) => {
	// Handle image input
	const files = event.target.files;

	// Validate file input
	if (!files || !files.length) {
		return;
	}

	const targetFile = files[0];

	// Load image onto image editor
	editor.loadImageFile(targetFile);
});

slider.addEventListener("input", (event) => {
	// Zoom image on change slider input
	const zoom = event.target.value;
	editor.zoomImage(zoom);
});
