import { createContext, useContext, useState } from "react";

type StreamsContextType = {
  cameraStream: MediaStream | null;
  screenshareStream: MediaStream | null;
  setCameraStream: (value: React.SetStateAction<MediaStream | null>) => void;
  setScreenshareStream: (
    value: React.SetStateAction<MediaStream | null>
  ) => void;
};

const StreamsContext = createContext<StreamsContextType | undefined>(undefined);

type StreamsProviderProps = {
  children: React.ReactNode;
};
export const StreamsProvider: React.FC<StreamsProviderProps> = ({
  ...props
}) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenshareStream, setScreenshareStream] =
    useState<MediaStream | null>(null);

  return (
    <StreamsContext.Provider
      value={{
        cameraStream,
        screenshareStream,
        setCameraStream,
        setScreenshareStream,
      }}
      {...props}
    />
  );
};

export const useStreams = (): StreamsContextType => {
  const context = useContext(StreamsContext);

  if (context === undefined) {
    throw new Error("useStreams must be used within a StreamsProvider");
  }

  return context;
};
