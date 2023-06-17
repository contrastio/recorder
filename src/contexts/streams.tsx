import { createContext, useContext, useState } from "react";

type StreamsContextType = {
  streams: MediaStream[];
  addStream: (stream: MediaStream) => void;
};

const StreamsContext = createContext<StreamsContextType | undefined>(undefined);

type StreamsProviderProps = {
  children: React.ReactNode;
};
export const StreamsProvider: React.FC<StreamsProviderProps> = ({
  ...props
}) => {
  const initialStreams: MediaStream[] = [];
  const [streams, setStreams] = useState(initialStreams);

  const addStream = (stream: MediaStream) => {
    streams.push(stream);
    setStreams(streams);
  };

  return <StreamsContext.Provider value={{ streams, addStream }} {...props} />;
};

export const useStreams = (): StreamsContextType => {
  const context = useContext(StreamsContext);

  if (context === undefined) {
    throw new Error("useStreams must be used within a StreamsProvider");
  }

  return context;
};
