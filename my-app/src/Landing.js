import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import p5 from 'p5';

function Landing() {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const navigate = useNavigate();
  const canvasRef = React.useRef();
  const gifRef = React.useRef();

  useEffect(() => {
    // Location permission
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('Location access granted:', position);
        setButtonEnabled(true);
      },
      error => {
        console.error('Location access denied:', error);
      }
    );

    // Initialize p5 sketch
    const sketch = p => {
      p.setup = () => {
        p.createCanvas(500, 300).parent(canvasRef.current);
        p.background(0);
        gifRef.current = p.createImg(process.env.PUBLIC_URL + '/mascot.gif', '');
        gifRef.current.style('position', 'absolute');
        gifRef.current.style('top', '50%');
        gifRef.current.style('left', '50%');
        gifRef.current.style('transform', 'translate(-50%, -50%)');
        gifRef.current.style('z-index', '10'); // Ensure the GIF is above the canvas
      };

      p.draw = () => {
        p.clear(); // Clear the canvas before drawing
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      // Clean up p5 instance and remove the gif_createImg
      p5Instance.remove();
      if (gifRef.current) {
        gifRef.current.remove();
      }
    };
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-cover' style={{ backgroundImage: "url('campus.jpg')" }}>
      <div className='bg-white bg-opacity-75 p-8 rounded-lg text-center' style={{ zIndex: '5' }}>
        <h1 className='text-2xl font-bold mb-2'>Welcome to the UVU Clue Game</h1>
        <p className='text-2xl mb-4'>This game will take you on a tour of the UVU campus.</p>
        <button
          className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-4 ${buttonEnabled ? 'hover:animate-shake' : ''}`}
          onClick={() => navigate('/clues')}
          disabled={!buttonEnabled}
        >
          Start Playing!
        </button>
      </div>
      <div ref={canvasRef} style={{ width: '70%', height: '70%', position: 'relative' }} />
    </div>
  );
}

export default Landing;
