import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
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

  const mediaRecorder = useRef<MediaRecorder>();
  const chunks = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    console.log("startRecording");
    console.log({ document: window.document });

    if (!screenshareStream) return;

    setIsRecording(true);

    chunks.current = [];
    mediaRecorder.current = new MediaRecorder(screenshareStream, {
      mimeType: "video/webm; codecs=vp9",
    });
    mediaRecorder.current.ondataavailable = (event) => {
      console.log({ data: event.data });
      if (event.data.size > 0) chunks.current.push(event.data);
    };
    mediaRecorder.current.start();
  }, [screenshareStream]);

  const stopRecording = useCallback(() => {
    console.log("stopRecording");

    setIsRecording(false);
    mediaRecorder.current?.stop();

    const blob = new Blob(chunks.current, {
      type: "video/webm",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recording.webm";
    link.click();

    window.URL.revokeObjectURL(url);
  }, []);

  const pauseRecording = useCallback(() => {
    setIsPaused(true);
    console.log("pauseRecording");
  }, []);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
    console.log("resumeRecording");
  }, []);

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
