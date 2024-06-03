import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Congratulations() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { finalTime } = location.state || { finalTime: 'Unknown' };

  const handleSubmit = () => {
    // Simulated database submission
    console.log('Submitting:', name, finalTime, new Date().toISOString());
    navigate('/leaderboard', { state: { name, finalTime } });
  };

  return (
    <div className="congratulations-page">
      <h1>Final Time: {finalTime} seconds</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Congratulations;
