import { createContext, useContext, useState } from 'react';

export type Layout = 'screenOnly' | 'screenAndCamera' | 'cameraOnly';

type LayoutContextType = {
  layout: Layout;
  setLayout: (layout: React.SetStateAction<Layout>) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [layout, setLayout] = useState<Layout>('screenAndCamera');

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
};
