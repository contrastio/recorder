import { createContext, useContext, useState } from 'react';

type StreamsContextType = {
  cameraStream: MediaStream | null;
  microphoneStream: MediaStream | null;
  screenshareStream: MediaStream | null;
  setCameraStream: (value: React.SetStateAction<MediaStream | null>) => void;
  setMicrophoneStream: (
    value: React.SetStateAction<MediaStream | null>,
  ) => void;
  setScreenshareStream: (
    value: React.SetStateAction<MediaStream | null>,
  ) => void;
};

const StreamsContext = createContext<StreamsContextType | undefined>(undefined);

type StreamsProviderProps = {
  children: React.ReactNode;
};

export const StreamsProvider = ({ children }: StreamsProviderProps) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(
    null,
  );
  const [screenshareStream, setScreenshareStream] =
    useState<MediaStream | null>(null);

  return (
    <StreamsContext.Provider
      value={{
        cameraStream,
        microphoneStream,
        screenshareStream,
        setCameraStream,
        setMicrophoneStream,
        setScreenshareStream,
      }}
    >
      {children}
    </StreamsContext.Provider>
  );
};

export const useStreams = (): StreamsContextType => {
  const context = useContext(StreamsContext);

  if (context === undefined) {
    throw new Error('useStreams must be used within a StreamsProvider');
  }

  return context;
};
