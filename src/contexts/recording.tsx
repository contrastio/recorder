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
  const { cameraStream, screenshareStream } = useStreams();

  const mediaRecorder = useRef<MediaRecorder>();

  const startRecording = useCallback(async () => {
    console.log("startRecording");
    console.log({ document: window.document });

    if (!screenshareStream) return;

    setIsRecording(true);

    const cameraVideoTrack = cameraStream?.getVideoTracks()[0];
    const cameraAudioTrack = cameraStream?.getAudioTracks()[0];
    const screenshareVideoTrack = screenshareStream.getVideoTracks()[0];

    const cameraProcessor = cameraVideoTrack
      ? new MediaStreamTrackProcessor({ track: cameraVideoTrack })
      : null;

    const screenshareProcessor = new MediaStreamTrackProcessor({
      track: screenshareVideoTrack,
    });
    const screenshareReader = screenshareProcessor.readable.getReader();
    const recordingGenerator = new MediaStreamTrackGenerator({ kind: "video" });

    if (cameraProcessor) {
      const canvas = new OffscreenCanvas(0, 0);
      const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

      const transformer = new TransformStream({
        async transform(cameraFrame: VideoFrame, controller) {
          const { value: screenshareFrame } = await screenshareReader.read();
          if (screenshareFrame) {
            canvas.width = screenshareFrame.displayWidth;
            canvas.height = screenshareFrame.displayHeight;
            ctx.drawImage(screenshareFrame, 0, 0);
            screenshareFrame.close();
          }

          const cameraWidth = cameraFrame.displayWidth;
          const cameraHeight = cameraFrame.displayHeight;

          ctx.beginPath();
          ctx.arc(canvas.width - 150, canvas.height - 150, 100, 0, 2 * Math.PI);
          ctx.clip();

          ctx.drawImage(
            cameraFrame,
            (cameraWidth - cameraHeight) / 2,
            0,
            cameraHeight,
            cameraHeight,
            canvas.width - 250,
            canvas.height - 250,
            200,
            200
          );

          ctx.restore();

          const newFrame = new VideoFrame(canvas, {
            timestamp: cameraFrame.timestamp,
          });
          cameraFrame.close();
          controller.enqueue(newFrame);
        },
      });

      cameraProcessor.readable
        .pipeThrough(transformer)
        .pipeTo(recordingGenerator.writable);
    } else {
      screenshareProcessor.readable.pipeTo(recordingGenerator.writable);
    }

    const recordingStream = new MediaStream([recordingGenerator]);
    if (cameraAudioTrack) {
      recordingStream.addTrack(cameraAudioTrack);
    }

    const chunks: Blob[] = [];

    mediaRecorder.current = new MediaRecorder(recordingStream, {
      mimeType: "video/webm; codecs=vp9",
    });

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
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

    mediaRecorder.current.start();
  }, [cameraStream, screenshareStream]);

  const stopRecording = useCallback(() => {
    console.log("stopRecording");

    setIsRecording(false);
    mediaRecorder.current?.stop();
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
