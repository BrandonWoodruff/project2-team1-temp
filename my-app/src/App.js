import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Clues from './Clues';
import ClueSuccess from './ClueSuccess';
import Congratulations from './Congratulations';
import Leaderboard from './Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clues" element={<Clues />} />
        <Route path="/clue-success/:clueId" element={<ClueSuccess />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
