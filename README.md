# WORKSHOP-9 Live Video - Smart Mirror Project
### Link to Github Repository: https://github.com/adra086/WORKSHOP-9/

## Project Description

In this project, I created an experimental "smart mirror" using **p5.js** and **live video capture**. The smart mirror displays real-time video with multiple pixel-level manipulations, creating an interactive, artistic effect. Various filters and effects were applied to different sections of the screen, making the experience dynamic and visually interesting.

The project meets the requirements by capturing live video, manipulating it at the pixel level using **p5.js**, and applying unique effects, including color inversion, grayscale, and RGB shifts.

## Learning Objectives

1. **Learn how to work with live video capture in p5.js**.
2. **Apply pixel-level manipulations to create dynamic visual effects**.
3. **Experiment with real-time graphics to create an artistic and experimental mirror effect**.

## Features of the Smart Mirror

- **Live Video Feed:** Captures the user's live video and displays it on the canvas.
- **Multiple Pixel Manipulations:** Applies different effects to specific regions of the canvas:
  - **Top-left:** Inverted colors.
  - **Top-right:** Grayscale.
  - **Bottom half:** RGB color shifting.
- **Dynamic Interactivity:** The pixel manipulations update in real-time as the video plays, creating a continuously changing visual experience.

## How the Code Works

### 1. **Setting Up the Canvas and Video Capture**

The video capture is set up using the `createCapture(VIDEO)` function, which continuously streams the video feed.

```javascript
let video;

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide(); // Hide the default video element to draw it manually
}
```
### 2. Accessing and Manipulating Pixel Data

We use video.loadPixels() to access the pixel data. The pixel array is modified based on the region of the canvas.

``` javascript
function draw() {
  background(0);
  video.loadPixels();
  
  // Loop through the pixels in the video feed
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // Apply different effects based on regions of the screen
      if (x < width / 2 && y < height / 2) {
        // Top-left: Inverted colors
        video.pixels[index] = 255 - r;
        video.pixels[index + 1] = 255 - g;
        video.pixels[index + 2] = 255 - b;
      } else if (x >= width / 2 && y < height / 2) {
        // Top-right: Grayscale effect
        let avg = (r + g + b) / 3;
        video.pixels[index] = avg;
        video.pixels[index + 1] = avg;
        video.pixels[index + 2] = avg;
      } else if (y >= height / 2) {
        // Bottom-half: RGB color shift
        video.pixels[index] = g; // Red channel gets green
        video.pixels[index + 1] = b; // Green channel gets blue
        video.pixels[index + 2] = r; // Blue channel gets red
      }
    }
  }

  video.updatePixels();
  image(video, 0, 0, width, height); // Display the manipulated video
}
```

## Problem-Solving and Challenges
### Problem 1: Pixel Manipulations Overlapping

Initially, the pixel manipulations overlapped or didn’t display correctly because I wasn’t segmenting the screen properly.

#### Solution:
I divided the canvas into regions using if conditions to apply different effects in specific areas without interference.
### Problem 2: Lag in Real-Time Display

At first, there was noticeable lag due to complex pixel manipulations.

#### Solution:
I simplified the pixel processing logic and used video.loadPixels() efficiently. I ensured that only essential calculations were performed inside the loops.
### Problem 3: Applying Region-Specific Effects

I had trouble making the effects dynamic and visually distinct.

#### Solution:
I experimented with different pixel manipulations and tested multiple filters (grayscale, inversion, and RGB shifts). ChatGPT provided suggestions to split the canvas and optimize the effects.
How ChatGPT Helped
ChatGPT was incredibly helpful throughout this project:

    Setting Up the Video Capture: Helped me initialize and hide the video feed properly using createCapture(VIDEO).
    Pixel Manipulation: Suggested different pixel manipulations like grayscale and color inversion, which made the mirror visually interesting.
    Debugging and Optimization: Guided me in troubleshooting issues related to lag and overlapping pixel effects, ensuring smooth real-time performance.

## Screenshots

    - Initial Setup - Live Video Feed : Screenshot showing the initial video feed before any manipulations.

    - Pixel Manipulation Effects : Include a screenshot showing the different regions with their respective effects (inverted, grayscale, and RGB-shifted).

### Ideas for Further Development

    User-Controlled Filters: Allow the user to toggle different filters using buttons or key presses.
    Additional Effects: Experiment with more pixel manipulations like edge detection, pixel sorting, or thresholding.
    Mirror Layouts: Create a dynamic layout where different regions switch effects randomly.

## Helpful Resources

    p5.js Documentation: https://p5js.org/
    Workshop Tutorials: Provided guidance on accessing pixel data and applying manipulations.
    ChatGPT: Assisted with debugging, region-specific effects, and optimization.

### Final Thoughts
This project was a fun and interactive way to explore live video capture and real-time pixel manipulations using p5.js. By splitting the canvas into regions, I created a dynamic mirror effect that can be easily expanded with additional filters and features.
