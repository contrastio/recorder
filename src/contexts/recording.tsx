import { createContext, useContext, useState } from "react";
import { useStreams } from "./streams";

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
  const { screenshareStream } = useStreams();

  let mediaRecorder: MediaRecorder;
  let chunks: Blob[];

  const startRecording = async () => {
    console.log("startRecording");
    console.log({ document: window.document });

    if (!screenshareStream) return;

    setIsRecording(true);
    mediaRecorder = new MediaRecorder(screenshareStream, {
      mimeType: "video/webm; codecs=vp9",
    });

    mediaRecorder.start();
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
  };

  const stopRecording = () => {
    console.log("stopRecording");

    setIsRecording(false);
    mediaRecorder.stop();

    const blob = new Blob(chunks, {
      type: "video/webm",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recording.webm";
    link.click();

    window.URL.revokeObjectURL(url);
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
