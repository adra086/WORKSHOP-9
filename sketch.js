let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  noStroke();
}

function draw() {
  background(0);
  video.loadPixels();
  loadPixels();

  for (let y = 0; y < video.height; y += 2) {  // Skip every alternate row for performance
    for (let x = 0; x < video.width; x += 2) {  // Skip every alternate column
      let index = (x + y * video.width) * 4;

      // Get RGB values
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let newColor;

      // Apply filters to different screen regions
      if (x < width / 2 && y < height / 2) {
        // Top-left: Inverted colors
        newColor = color(255 - r, 255 - g, 255 - b);
      } else if (x >= width / 2 && y < height / 2) {
        // Top-right: Grayscale
        let avg = (r + g + b) / 3;
        newColor = color(avg, avg, avg);
      } else {
        // Bottom half: Color shift (R -> G -> B)
        newColor = color(g, b, r);
      }

      // Draw rectangles instead of modifying all pixels
      fill(newColor);
      rect(x, y, 2, 2);  // Small blocks to improve efficiency
    }
  }
}
