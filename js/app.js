import { copyImageToCanvas } from "./canvas.js"

const imgInput = document.getElementById("img-input")

imgInput.addEventListener("change", e => {

    // Handle image input
    // Create image url reference
    // Copy image onto canvas

    // Access input files
    const files = e.target.files

    // Validate file input
    if (!files || !files.length) {
        return;
    }

    const targetFile = files[0]
    
    // Create image URL object
    // Pass url to be copied onto canvas
    const image = URL.createObjectURL(targetFile)
    copyImageToCanvas(image)
})

