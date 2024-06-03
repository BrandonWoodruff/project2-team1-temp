import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Request location permission when the component mounts
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location access granted:', position);
        setButtonEnabled(true);
      },
      (error) => {
        console.error('Location access denied:', error);
      }
    );
  }, []); // The empty array ensures this effect runs only once after the component mounts

  return (
    <div className="landing-page">
      <h1>Welcome to the Clue Game!</h1>
      <button
        style={{ backgroundColor: buttonEnabled ? 'green' : 'gray' }}
        onClick={() => buttonEnabled && navigate('/clues')}
        disabled={!buttonEnabled}
      >
        Start Playing
      </button>
    </div>
  );
}

export default Landing;
