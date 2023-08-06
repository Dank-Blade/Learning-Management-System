import React, { createContext, useState } from 'react';

export const ModulesContext = createContext();

export const ModulesProvider = ({ children }) => {
  const [displayedModules, setDisplayedModules] = useState([]);

  const updateDisplayedModules = (newModules) => {
    setDisplayedModules(newModules);
  };

  return (
    <ModulesContext.Provider value={{ displayedModules, updateDisplayedModules }}>
      {children}
    </ModulesContext.Provider>
  );
};
