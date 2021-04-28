import { handleMouseMoveImage, handleTouchMoveImage } from "./control.js";

export default class ImageEditor {
	// Image editor can only handle one canvas
	canvas;

	// Context for Canvas API - type CanvasRenderingContext2D
	ctx;

	// Image object references the image on display
	image = {
		file: null,
		source: null,
		zoom: 0,
		posX: 0,
		posY: 0,
		width: 0,
		height: 0,
	};

	constructor(canvas) {
		// Set up canvas and context
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		// Handle move image controls on canvas
		handleMouseMoveImage(canvas, window, this);
		handleTouchMoveImage(canvas, window, this);
	}

	loadImageFile(imageFile) {
		// Remove previous file from memory
		URL.revokeObjectURL(this.image.file);

		// Create new image instance & setup load handler
		const image = new Image();

		image.onload = () => {
			this.image.source = image;
			this.loadImageOntoCanvas();
		};

		// Create & save url reference to new file in memory
		this.image.file = URL.createObjectURL(imageFile);

		// Supply image with file as source
		image.src = this.image.file;

		return this;
	}

	loadImageOntoCanvas() {
		// Resize image to fit on canvas
		this.image.posX = 0;
		this.image.posY = 0;
		const targetWidth = this.canvas.width;
		this.resizeImage(targetWidth);
		this.canvas.height = this.image.height;
		this.drawImage();
	}

	resizeImage(targetWidth) {
		if (!this.image.source) return;
		// Resize image height to preserve aspect ratio
		const percentChange = targetWidth / this.image.source.width;

		this.image.width = targetWidth;
		this.image.height = this.image.source.height * percentChange;
	}

	zoomImage(zoom) {
		// Zoom image scale
		this.zoom = zoom = zoom / 200;
		const zoomFactor = zoom * this.image.width;

		// Ensure zoom is about center of canvas
		const canvasCenterX = this.canvas.width / 2;
		const canvasCenterY = this.canvas.height / 2;

		// Resize image by zoom factor (min zoom = canvas width)
		this.resizeImage(zoomFactor + this.canvas.width);

		// Update positions to keep center of image at center of canvas
		this.image.posX = canvasCenterX - this.image.width / 2;
		this.image.posY = canvasCenterY - this.image.height / 2;

		// Update canvas image
		this.clearImage();
		this.drawImage();
	}

	moveImage(_dx, _dy) {
		if (!this.image.source) return;

		const { dx, dy } = this.handleEdgeCollisions(_dx, _dy);
		// Move image by dx and dy pixels
		this.clearImage();
		this.drawImage(dx, dy);
	}

	endMoveImage(dx, dy) {
		if (!this.image.source) return;
		// Update actual positions & reset delta positions
		this.image.posX += dx;
		this.image.posY += dy;
	}

	clearImage() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawImage(dx = 0, dy = 0) {
		if (!this.image.source) return;
		// Draw image onto canvas
		this.ctx.drawImage(
			this.image.source,
			this.image.posX + dx,
			this.image.posY + dy,
			this.image.width,
			this.image.height
		);
	}
	handleEdgeCollisions(dx, dy) {
		// Collide left
		let collided = this.image.posX + dx >= 0;
		if (collided) {
			dx = 0 - this.image.posX;
		}

		// Collide right
		collided = this.image.posX + dx + this.image.width <= this.canvas.width;
		if (collided) {
			dx = this.canvas.width - this.image.posX - this.image.width;
		}

		// Collide top
		collided = this.image.posY + dy >= 0;
		if (collided) {
			dy = 0 - this.image.posY;
		}

		// Collide bottom
		collided =
			this.image.posY + dy + this.image.height <= this.canvas.height;
		if (collided) {
			dy = this.canvas.height - this.image.posY - this.image.height;
		}

		// Return the clipped dx & dy values,
		// where they dont collide with the edges the canvas
		return { dx, dy };
	}
}
