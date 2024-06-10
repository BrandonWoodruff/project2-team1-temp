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
    new p5(sketch, sketchRef.current);
  }, []);

  const sketch = (p) => {
    let particles = [];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      for (let i = 0; i < 100; i++) { // Number of particles
        particles.push(new Particle(p));
      }
    };

    p.draw = () => {
      p.background(0);
      particles.forEach((particle, index) => {
        particle.update();
        particle.show();
        if (particle.isDead()) {
          particles[index] = new Particle(p); // Recreate particles once they die
        }
      });
    };

    class Particle {
      constructor(p) {
        this.p = p;
        this.pos = p.createVector(p.random(-200, 200), p.random(-200, 200), p.random(-200, 200));
        this.vel = p5.Vector.random3D().mult(p.random(0.1, 1)); // Slower velocities
        this.acc = p.createVector(0, 0, 0);
        this.color = [p.random(100, 255), p.random(100, 255), p.random(100, 255)]; // Random colors
        this.size = p.random(5, 20);
        this.lifespan = 400; // Lifespan to control fading
        this.fade = 0.5; // Slower fade rate
      }

      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.lifespan -= this.fade; // Decrease lifespan slower to extend particle life
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
