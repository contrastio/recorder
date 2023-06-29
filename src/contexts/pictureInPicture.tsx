import { createContext, useContext, useRef, useState } from 'react';

import { useRecording } from './recording';

type PictureInPictureContextType = {
  pipWindow: Window | null;
  requestPipWindow: () => Promise<void>;
  exitPipWindow: () => void;
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
  const { stopRecording } = useRecording();
  const [pipWindow, _setPipWindow] = useState<Window | null>(null);

  // Required to fix a race condition when trying to close the window before
  // setPipWindow had a chance to update the state
  const pipWindowRef = useRef<Window | null>(null);

  const updatePipWindow = (pipWindow: Window | null) => {
    pipWindowRef.current = pipWindow;
    _setPipWindow(pipWindow);
  };

  const requestPipWindow = async () => {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 300,
      height: 300,
    });

    pipWindow.onpagehide = () => {
      stopRecording();
      updatePipWindow(null);
    };

    const allCSS = [...document.styleSheets]
      .map((styleSheet) =>
        [...styleSheet.cssRules].map((r) => r.cssText).join('')
      )
      .filter(Boolean)
      .join('\n');
    const style = document.createElement('style');
    style.textContent = allCSS;
    pipWindow.document.head.appendChild(style);

    updatePipWindow(pipWindow);
  };

  const exitPipWindow = () => {
    pipWindowRef.current?.close();
    updatePipWindow(null);
  };

  return (
    <PictureInPictureContext.Provider
      value={{ pipWindow, requestPipWindow, exitPipWindow }}
    >
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
