import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import p5 from 'p5';

function Congratulations() {
  const navigate = useNavigate();
  const sketchRef = useRef();

  useEffect(() => {
    // Vibrate the device when this page loads
    if (navigator.vibrate) {
      navigator.vibrate([1000, 300, 1000, 300, 1000]); // A longer vibration pattern
    }

    // Initialize p5.js sketch for animation
    let p5Instance = new p5(sketch, sketchRef.current);
    return () => { p5Instance.remove(); }; // Clean up the sketch when component unmounts or re-renders
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const sketch = (p) => {
    let particles = [];
    let hueOffset = p.random(0, 255); // Random offset for the hue

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.colorMode(p.HSB, 255); // Use HSB for more vibrant colors
      p.noStroke();
      for (let i = 0; i < 150; i++) { // Number of particles
        particles.push(new Particle(p, hueOffset));
      }
    };

    p.draw = () => {
      p.background(0);
      particles.forEach((particle, index) => {
        particle.update();
        particle.show();
        if (particle.isDead()) {
          particles[index] = new Particle(p, hueOffset); // Recreate particles with the same hue offset
        }
      });
    };

    class Particle {
      constructor(p, hueOffset) {
        this.p = p;
        this.pos = p.createVector(p.random(-p.width / 2, p.width / 2), p.random(-p.height / 2, p.height / 2), p.random(-p.width / 2, p.width / 2));
        this.vel = p5.Vector.random3D().mult(p.random(0.1, 1.5)); // Adjusted speeds
        this.acc = p.createVector(0, 0, 0);
        let hue = (hueOffset + p.random(100, 255)) % 255; // Apply the hue offset
        this.color = [hue, 255, 255]; // Bright colors with full saturation and brightness
        this.size = p.random(10, 20); // Larger sizes for more visibility
        this.lifespan = 255; // Starting opacity
        this.fade = 0.6; // Slower fade for longer visibility
      }

      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.lifespan -= this.fade; // Gradual fading
      }

      show() {
        this.p.push();
        this.p.translate(this.pos.x, this.pos.y, this.pos.z);
        this.p.fill(this.color[0], this.color[1], this.color[2], this.lifespan);
        this.p.sphere(this.size);
        this.p.pop();
      }

      isDead() {
        return this.lifespan < 0;
      }
    }
  };

  const handleRestart = () => {
    navigate('/'); // Navigate back to the landing page
  };

  return (
    <div className="congratulations flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div ref={sketchRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
      <h1 className="text-4xl font-bold mb-4 z-10">Congratulations! You've completed all clues!</h1>
      <button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 z-10">
        Restart Game
      </button>
    </div>
  );
}


export default Congratulations;
