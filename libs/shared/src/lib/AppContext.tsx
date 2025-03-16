import { createContext, useContext, useState } from 'react';

export const AppContext = createContext({
  passengerCount: 0,
  setPassengerCount: (count: number) => {},
});

export function AppProvider({ children }: any) {
  const [passengerCount, setPassengerCount] = useState(0);
  return (
    <AppContext.Provider value={{ passengerCount, setPassengerCount }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}