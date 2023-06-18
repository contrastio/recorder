import { useRef } from "react";
import { createPortal } from "react-dom";

import { useRecording } from "./contexts/recording";
import { useStreams } from "./contexts/streams";

import styles from "./PiPWindow.module.scss";

const PiPWindow = () => {
  const {
    isRecording,
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording();

  const { cameraStream } = useStreams();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoElement = videoRef.current;
  if (cameraStream && videoElement) {
    videoElement.srcObject = cameraStream;
  }

  return createPortal(
    <div className={styles.container}>
      <video
        className={styles.camera}
        autoPlay
        playsInline
        muted
        controls={false}
        ref={videoRef}
      />
      <div className={styles.toolbar}>
        <button onClick={startRecording} disabled={isRecording}>
          Start
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop
        </button>
        <button onClick={pauseRecording} disabled={!isRecording || isPaused}>
          Pause
        </button>
        <button onClick={resumeRecording} disabled={!isRecording || !isPaused}>
          Resume
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PiPWindow;
