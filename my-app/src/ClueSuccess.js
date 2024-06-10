import React, { useEffect } from 'react';                    
import { useNavigate, useParams } from 'react-router-dom';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketches/sketch'; // Ensure this path is correct and sketches are exported properly

function ClueSuccess() {
  const { clueId } = useParams();
  const navigate = useNavigate();

  // Function to trigger vibration
  const handleVibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 700, 100, 100]);
    } else {
      alert("Vibration API is not supported by your browser.");
    }
  };

  const continueGame = () => {
    navigate('/clues');
  };

    // useEffect is a React hook that is called when the user visits the page. This should trigger the vibration to occur
    // Call handleVibrate when the component mounts
    useEffect(() => {
      handleVibrate();
    }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="clue-success-page flex justify-center items-center h-screen bg-cover"
         style={{ backgroundImage: "url('/campus.jpg')" }}>
      <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Clue {clueId} Completed!</h1>
        <ReactP5Wrapper sketch={sketch[clueId]} />
        <button
          onClick={continueGame}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ClueSuccess;
