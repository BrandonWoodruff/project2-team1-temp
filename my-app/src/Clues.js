import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

function Clues() {
  const {
    timer,
    setTimer,
    isActive,
    setIsActive,
    clueCompletion,
    setClueCompletion
  } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer if it's not active and should be running
    if (!isActive && Object.values(clueCompletion).some(completed => !completed)) {
      setIsActive(true);
    }

    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);  // Clear the interval when the component unmounts
  }, [isActive, setIsActive, setTimer, clueCompletion]);

  useEffect(() => {
    // Check if all clues are completed and navigate to Congratulations page if so
    const allCompleted = Object.values(clueCompletion).every(Boolean);
    if (allCompleted) {
      setIsActive(false);  // Stop the timer
      navigate('/Congratulations');  // Navigate to the Congratulations page
    }
  }, [clueCompletion, navigate, setIsActive]);

  const handleClueCompletion = (clueId) => {
    setClueCompletion(prev => ({ ...prev, [clueId]: true }));
    navigate(`/clue-success/${clueId}`);
  };

  const overrideClueCompletion = (clueId) => {
    handleClueCompletion(clueId);
  };

  return (
    <div className="clues-page">
      <h1>Timer: {timer} seconds</h1>
      <ul>
        {Object.entries(clueCompletion).map(([clueId, isCompleted]) => (
          <li key={clueId}>
            Clue {clueId}
            <input
              type="checkbox"
              checked={isCompleted}
              readOnly
            />
            <button onClick={() => overrideClueCompletion(clueId)}>Override Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clues;