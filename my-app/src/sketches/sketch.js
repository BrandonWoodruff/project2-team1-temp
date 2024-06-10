// Example sketches for each clue
let p5 = require('p5');
const sketch = {
'1': function (p) {
  let particles = [];

  p.setup = function () {
    p.createCanvas(400, 600, p.WEBGL);
    p.colorMode(p.HSB, 255);
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(p));
    }
  };

  p.draw = function () {
    p.clear();
    p.rotateY(p.frameCount * 0.01);

    particles.forEach((particle, index) => {
      particle.update();
      particle.edges();
      particle.show();
    });
  };

  class Particle {
    constructor(p) {
      this.p = p;
      this.pos = p.createVector(p.random(-200, 200), p.random(-200, 200), p.random(-200, 200));
      this.vel = p5.Vector.random3D().mult(p.random(0.5, 2));
      this.acc = p.createVector(0, 0, 0);
      this.color = p.color(p.random(255), 255, 255);
      this.size = p.random(5, 10);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); // Reset acceleration
    }

    edges() {
      if (this.pos.x > 200 || this.pos.x < -200) this.vel.x *= -1;
      if (this.pos.y > 200 || this.pos.y < -200) this.vel.y *= -1;
      if (this.pos.z > 200 || this.pos.z < -200) this.vel.z *= -1;
    }

    show() {
      this.p.push();
      this.p.translate(this.pos.x, this.pos.y, this.pos.z);
      this.p.noStroke();
      this.p.fill(this.color);
      this.p.sphere(this.size);
      this.p.pop();
    }
  };
}



,
'2': function (p) {
  let x, y, vx, vy;

  p.setup = function () {
    p.createCanvas(400, 600);
    x = p.width / 2;
    y = p.height / 2;
    vx = 2;
    vy = 3;
    p.colorMode(p.HSB, 255); // Using HSB for smooth color transitions
    p.noStroke(); // Removes the stroke for cleaner look
  };

  p.draw = function () {
    drawGradientBackground(p);
    x += vx;
    y += vy;

    // Check for collisions with the edges of the canvas
    if (x > p.width - 25 || x < 25) {
      vx = -vx;
      p.fill(p.random(255), 255, 255); // Change color on bounce
    } else if (y > p.height - 25 || y < 25) {
      vy = -vy;
      p.fill(p.random(255), 255, 255); // Change color on bounce
    } else {
      // Maintain a colorful appearance
      p.fill(p.frameCount % 255, 255, 255); // Continuously changing color
    }

    // Draw the bouncing square
    p.rect(x - 25, y - 25, 50, 50);
  };

  function drawGradientBackground(p) {
    // Create a radial gradient background
    let radius = p.width / 2;
    let h = (p.frameCount / 2) % 255; // Slowly change the hue
    for (let r = radius; r > 0; --r) {
      p.fill(h, 255, 255 * r / radius);
      p.ellipse(p.width / 2, p.height / 2, r, r);
    }
  }
}

,
'3': function (p) {
  let pyramids = [];

  p.setup = function () {
    p.createCanvas(400, 600, p.WEBGL);
    p.colorMode(p.HSB, 255);
    // Create multiple pyramids
    for (let i = 0; i < 10; i++) { // Adjust number for more or fewer pyramids
      pyramids.push(new Pyramid(p));
    }
  };

  p.draw = function () { // Transparent background with clear()
    p.clear();
    p.rotateY(p.frameCount * 0.01);
    pyramids.forEach(pyramid => {
      pyramid.update();
      pyramid.show();
    });
  };

  class Pyramid {
    constructor(p) {
      this.p = p;
      this.pos = p.createVector(p.random(-200, 200), p.random(-200, 200), p.random(-200, 200));
      this.vel = p5.Vector.random3D();
      this.vel.mult(p.random(0.5, 2)); // Random speed
      this.axis = p.createVector(p.random(), p.random(), p.random());
      this.angle = 0;
      this.size = p.random(30, 60); // Random size of the pyramid
      this.color = p.color(p.random(255), 255, 255); // Random color
    }

    update() {
      this.pos.add(this.vel);
      this.angle += .005; // Speed of rotation
      // Simple boundary reflections
      if (Math.abs(this.pos.x) > p.width / 2 || Math.abs(this.pos.y) > p.height / 2 || Math.abs(this.pos.z) > p.width / 2) {
        this.vel.mult(-1);
      }
    }

    show() {
      this.p.push();
      this.p.translate(this.pos.x, this.pos.y, this.pos.z);
      this.p.rotateX(this.angle);
      this.p.rotateY(this.angle);
      this.p.rotateZ(this.angle);
      this.p.fill(this.color);
      this.p.noStroke();
      this.p.cone(this.size, this.size * 2); // Pyramid using a cone function
      this.p.pop();
    }
  }
}

,
}
  
  export default sketch;
  