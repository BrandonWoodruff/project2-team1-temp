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
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('campus.jpg')" }}>
      <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center w-full max-w-md mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Timer: {timer} seconds</h1>
        <ul className="space-y-4">
          {Object.entries(clueCompletion).map(([clueId, isCompleted]) => (
            <li key={clueId} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
              <span className="text-xl font-medium text-gray-800">Clue {clueId}</span>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  readOnly
                  className="h-6 w-6 text-green-700 rounded focus:ring-0"
                  style={{ accentColor: 'green' }}
                />
                <button
                  onClick={() => overrideClueCompletion(clueId)}
                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                >
                  Override
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Clues;