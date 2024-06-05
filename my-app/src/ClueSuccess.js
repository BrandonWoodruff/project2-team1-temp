import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ClueSuccess({ clueId }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Vibrate the device when this page loads
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500]); // Vibrate twice with a pause in between
    }
  }, []);

  const handleContinue = () => {
    navigate('/Clues'); // Navigate back to the Clues page
  };

  return (
    <div className="clue-success">
      <h1>Clue {clueId} Completed!</h1>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}

export default ClueSuccess;