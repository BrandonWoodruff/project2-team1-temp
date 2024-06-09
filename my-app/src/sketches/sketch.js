// Example sketches for each clue
const sketch = {
'1': function (p) {
  p.setup = function () {
    // Create a canvas with WEBGL mode to support 3D rendering
    p.createCanvas(400, 400, p.WEBGL);
    p.angleMode(p.DEGREES); // Set angle mode to degrees for easier rotation calculations
  };

  p.draw = function () {
    p.background(245); // A light background to simulate the page of a book
    p.orbitControl(); // Allows user to rotate and zoom the 3D canvas with mouse
    p.ambientLight(150); // Softly illuminates the whole scene uniformly
    p.directionalLight(255, 255, 255, 0, -1, -1); // Directional light for more defined shadows

    // Define book properties
    let bookHeight = 20;
    let bookDepth = 30;
    let bookWidth = 160;
    let bookCount = 5;
    let startY = -50; // Adjusted starting position for WEBGL coordinates

    for (let i = 0; i < bookCount; i++) {
      // Move to starting position for each book
      p.push();
      let shiftY = startY - i * bookHeight * 1.2; // Slightly separate the books
      p.translate(0, shiftY, 0);

      // Alternate book colors
      if (i % 2 === 0) {
        p.fill(142, 68, 173); // A deep purple color for even-indexed books
      } else {
        p.fill(231, 76, 60); // A vibrant red color for odd-indexed books
      }

      // Animate rotation for each book
      let rotateDegree = p.sin(p.frameCount + i * 10) * 5; // Each book rotates slightly different based on its order
      p.rotateY(rotateDegree);

      // Draw each book with 3D effect
      p.box(bookWidth, bookHeight, bookDepth); // Draw a 3D box representing the book

      p.pop();
    }

    // Add dynamic 3D text
    p.push();
    p.fill(255, 204, 0); // Yellow color for visibility
    p.textSize(32); // Set the text size
    p.translate(0, 50, 0); // Position the text above the scene
    p.textAlign(p.CENTER, p.CENTER); // Center the text horizontally and vertically
    p.text('You found the library!', 0, 0); // Place the text at the center of the canvas
    p.pop();
  };
}


,
    '2': function (p) {
      p.setup = function () {
        p.createCanvas(200, 200);
        p.background(150);
      };
  
      p.draw = function () {
        p.fill(0, 255, 0);
        p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50);
      };
    },
    '3': function (p) {
      p.setup = function () {
        p.createCanvas(200, 200);
        p.background(200);
      };
  
      p.draw = function () {
        p.fill(0, 0, 255);
        p.triangle(
          p.width / 2, p.height / 2 - 30,
          p.width / 2 - 30, p.height / 2 + 30,
          p.width / 2 + 30, p.height / 2 + 30
        );
      };
    }
  };
  
  export default sketch;
  