import { createContext, useContext, useState } from 'react';

type PictureInPictureContextType = {
  pipWindow: Window | null;
  requestPipWindow: () => Promise<void>;
};

const PictureInPictureContext = createContext<
  PictureInPictureContextType | undefined
>(undefined);

type PictureInPictureProviderProps = {
  children: React.ReactNode;
};

export const PictureInPictureProvider = ({
  children,
}: PictureInPictureProviderProps) => {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const requestPipWindow = async () => {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 300,
      height: 300,
    });

    const allCSS = [...document.styleSheets]
      .map((styleSheet) =>
        [...styleSheet.cssRules].map((r) => r.cssText).join('')
      )
      .filter(Boolean)
      .join('\n');
    const style = document.createElement('style');
    style.textContent = allCSS;
    pipWindow.document.head.appendChild(style);

    setPipWindow(pipWindow);
  };

  return (
    <PictureInPictureContext.Provider value={{ pipWindow, requestPipWindow }}>
      {children}
    </PictureInPictureContext.Provider>
  );
};

export const usePictureInPicture = (): PictureInPictureContextType => {
  const context = useContext(PictureInPictureContext);

  if (context === undefined) {
    throw new Error(
      'usePictureInPicture must be used within a PictureInPictureProvider'
    );
  }

  return context;
};