import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

function Clues() {
  const { timer, setTimer, isActive, setIsActive, clueCompletion, setClueCompletion } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, setTimer]);

  const handleClueCompletion = (clueId) => {
    setIsActive(false);
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
