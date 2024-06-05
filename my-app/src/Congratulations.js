import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Congratulations() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vibrate the device when this page loads
    if (navigator.vibrate) {
      navigator.vibrate([1000, 300, 1000, 300, 1000]); // A longer vibration pattern
    }
  }, []);

  const handleRestart = () => {
    navigate('/'); // Navigate back to the landing page or wherever restart should lead
  };

  return (
    <div className="congratulations">
      <h1>Congratulations! You've completed all clues!</h1>
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
}

export default Congratulations;