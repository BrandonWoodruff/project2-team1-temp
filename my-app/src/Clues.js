import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import Sketch from 'react-p5';

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

  const handleClueCompletion = (clueId) => {
    setClueCompletion(prev => ({ ...prev, [clueId]: true }));
    navigate(`/clue-success/${clueId}`);
  };

  const overrideClueCompletion = (clueId) => {
    handleClueCompletion(clueId);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400, p5.WEBGL).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // need to make a background that is transparent
    p5.background(0, 0, 0, 0);
    //color the box dark green
    p5.fill(0, 102, 0);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.rotateZ(p5.frameCount * 0.01);
    p5.box(100);
    //put a letter on the box
    p5.fill(255);

  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('campus.jpg')" }}>
      <div className="p-8 rounded-lg items-center w-full max-w-md mx-auto mt-8">
        <Sketch setup={setup} draw={draw} />
      </div>
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
