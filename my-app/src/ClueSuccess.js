import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketches/sketch'; // Ensure this path is correct and sketches are exported properly

function ClueSuccess() {
  const { clueId } = useParams();
  const navigate = useNavigate();

  const continueGame = () => {
    navigator.vibrate([200, 100, 200]); // Vibration pattern
    navigate('/clues');
  };

  return (
    <div className="clue-success-page flex justify-center items-center h-screen bg-cover"
         style={{ backgroundImage: "url('/campus.jpg')" }}>
      <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Clue {clueId} Completed!</h1>
        <ReactP5Wrapper sketch={sketch[clueId]} />
        <button
          onClick={continueGame}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ClueSuccess;
