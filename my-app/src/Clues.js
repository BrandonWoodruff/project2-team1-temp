import React, { useState, useEffect } from 'react';
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

  const questions = {
    '1': 'Where would you go to study?',
    '2': 'Where would you go to get a frosty?',
    '3': 'Where would you go to learn computer science?'
  };

  const answers = {
    '1': 'Library',
    '2': "Wendy's",
    '3': 'CS Building'
  };

  const [userAnswers, setUserAnswers] = useState({
    '1': '',
    '2': '',
    '3': ''
  });

  useEffect(() => {
    if (!isActive && Object.values(clueCompletion).some(completed => !completed)) {
      setIsActive(true);
    }

    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, setIsActive, setTimer, clueCompletion]);

  useEffect(() => {
    const allCompleted = Object.values(clueCompletion).every(Boolean);
    if (allCompleted) {
      setIsActive(false);
      navigate('/Congratulations');
    }
  }, [clueCompletion, navigate, setIsActive]);

  const handleChange = (clueId, event) => {
    if (!clueCompletion[clueId]) { // Only allow change if clue isn't completed
      const { value } = event.target;
      setUserAnswers(prev => ({ ...prev, [clueId]: value }));
    }
  };

  const handleCheckAnswer = (clueId) => {
    if (userAnswers[clueId].trim().toLowerCase() === answers[clueId].toLowerCase()) {
      setClueCompletion(prev => ({ ...prev, [clueId]: true }));
      navigate(`/clue-success/${clueId}`);
    } else {
      alert('Incorrect answer, please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('campus.jpg')" }}>
      <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center w-full max-w-md mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Timer: {timer} seconds</h1>
        <ul className="space-y-4">
          {Object.entries(questions).map(([clueId, question]) => (
            <li key={clueId} className="flex flex-col mb-4">
              <h2 className="text-xl font-bold mb-2">{question}</h2>
              <input
                type="text"
                value={userAnswers[clueId]}
                onChange={(event) => handleChange(clueId, event)}
                disabled={clueCompletion[clueId]} // Disable input if clue is completed
                className="text-lg p-2 border border-gray-300 rounded"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={clueCompletion[clueId]}
                  readOnly
                  className="h-6 w-6 text-green-700 rounded focus:ring-0"
                  style={{ accentColor: 'green' }}
                />
                <button
                  onClick={() => handleCheckAnswer(clueId)}
                  disabled={clueCompletion[clueId]} // Disable button if clue is completed
                  className="ml-4 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                >
                  Check Answer
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
