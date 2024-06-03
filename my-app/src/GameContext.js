import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [clueCompletion, setClueCompletion] = useState({ 1: false, 2: false, 3: false });

  return (
    <GameContext.Provider value={{ timer, setTimer, isActive, setIsActive, clueCompletion, setClueCompletion }}>
      {children}
    </GameContext.Provider>
  );
};
