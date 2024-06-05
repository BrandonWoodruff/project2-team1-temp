// ClueSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let vibrateInterval;

export function startVibrate(duration) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  } else {
    console.log('Vibration not supported on this device.');
  }
}

export function stopVibrate() {
  if ('vibrate' in navigator) {
    if (vibrateInterval) clearInterval(vibrateInterval);
    navigator.vibrate(0);
  }
}

export function startPersistentVibrate(duration, interval) {
  if ('vibrate' in navigator) {
    vibrateInterval = setInterval(() => {
      startVibrate(duration);
    }, interval);
  } else {
    console.log('Persistent vibration not supported on this device.');
  }
}

function ClueSuccess({ clueId }) {
  const navigate = useNavigate();

  useEffect(() => {
    startVibrate(500); // Vibrate for 500 milliseconds

    return () => {
      stopVibrate(); // Stop any ongoing vibration when component unmounts
    };
  }, []);

  const handleContinue = () => {
    navigate('/Clues');
  };

  return (
    <div className="clue-success">
      <h1>Clue {clueId} Completed!</h1>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}

export default ClueSuccess;