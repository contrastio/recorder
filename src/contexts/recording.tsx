import { createContext, useContext, useState } from "react";

type RecordingContextType = {
  isRecording: boolean;
  isPaused: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
};

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined
);

type RecordingProviderProps = {
  children: React.ReactNode;
};
export const RecordingProvider: React.FC<RecordingProviderProps> = ({
  ...props
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    console.log("startRecording");
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("stopRecording");
  };

  const pauseRecording = () => {
    setIsPaused(true);
    console.log("pauseRecording");
  };

  const resumeRecording = () => {
    setIsPaused(false);
    console.log("resumeRecording");
  };

  return (
    <RecordingContext.Provider
      value={{
        isRecording,
        isPaused,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
      }}
      {...props}
    />
  );
};

export const useRecording = (): RecordingContextType => {
  const context = useContext(RecordingContext);

  if (context === undefined) {
    throw new Error("useRecording must be used within a RecordingProvider");
  }

  return context;
};
