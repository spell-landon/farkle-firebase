import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);
  return (
    <Context.Provider value={[players, setPlayers]}>
      {children}
    </Context.Provider>
  );
}

export function usePlayersContext() {
  return useContext(Context);
}
