import { createContext, useContext, useState } from 'react';

type CountdownContextType = {
  countingDown: boolean;
  setCountingDown: (countingDown: React.SetStateAction<boolean>) => void;
};

const CountdownContext = createContext<CountdownContextType | undefined>(
  undefined,
);

type CountdownProviderProps = {
  children: React.ReactNode;
};

export const CountdownProvider = ({ children }: CountdownProviderProps) => {
  const [countingDown, setCountingDown] = useState(false);

  return (
    <CountdownContext.Provider value={{ countingDown, setCountingDown }}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = (): CountdownContextType => {
  const context = useContext(CountdownContext);

  if (context === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }

  return context;
};
