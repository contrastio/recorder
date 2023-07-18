import { createContext, useContext, useRef } from 'react';

import { useLayout } from './layout';
import { usePictureInPicture } from './pictureInPicture';
import { useRecording } from './recording';
import { useStreams } from './streams';

type ScreenshareContextType = {
  startScreenshare: () => Promise<void>;
};

const ScreenshareContext = createContext<ScreenshareContextType | undefined>(
  undefined,
);

type ScreenshareProviderProps = {
  children: React.ReactNode;
};

export const ScreenshareProvider = ({ children }: ScreenshareProviderProps) => {
  const { screenshareStream, setScreenshareStream } = useStreams();

  const { layout } = useLayout();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const { isRecording } = useRecording();
  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow, requestPipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const startScreenshare = async () => {
    if (!pipWindowRef.current) {
      pipWindowRef.current = await requestPipWindow();
    }
    if (screenshareStream) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      stream.getVideoTracks()[0].onended = () => {
        setScreenshareStream(null);
        if (isRecordingRef.current && layoutRef.current !== 'cameraOnly') {
          pipWindowRef.current?.close();
        }
      };
      setScreenshareStream(stream);
    } catch {
      // Happens when the user aborts the screenshare
      if (isRecordingRef.current && layoutRef.current !== 'cameraOnly') {
        pipWindowRef.current?.close();
      }
    }
  };

  return (
    <ScreenshareContext.Provider value={{ startScreenshare }}>
      {children}
    </ScreenshareContext.Provider>
  );
};

export const useScreenshare = (): ScreenshareContextType => {
  const context = useContext(ScreenshareContext);

  if (context === undefined) {
    throw new Error('useScreenshare must be used within a ScreenshareProvider');
  }

  return context;
};
