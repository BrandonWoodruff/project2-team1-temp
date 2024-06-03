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
    <div className="clue-success-page">
      <h1>Clue {clueId} Completed!</h1>
      <ReactP5Wrapper sketch={sketch[clueId]} />
      <button onClick={continueGame}>Continue</button>
    </div>
  );
}

export default ClueSuccess;
