import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Leaderboard() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { name, finalTime } = location.state || {};
    if (name && finalTime) {
      const newResult = { name, time: finalTime, date: new Date().toISOString() };
      const updatedResults = [...results, newResult].sort((a, b) => a.time - b.time);
      setResults(updatedResults);
      sessionStorage.setItem('leaderboard', JSON.stringify(updatedResults));
    } else {
      const storedResults = JSON.parse(sessionStorage.getItem('leaderboard') || '[]');
      setResults(storedResults);
    }
  }, [location.state, results]);

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.name}</td>
              <td>{result.time}</td>
              <td>{result.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/')}>Play Again</button>
    </div>
  );
}

export default Leaderboard;
