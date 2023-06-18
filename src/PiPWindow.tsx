import { createPortal } from "react-dom";

import { useRecording } from "./contexts/recording";

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

  return createPortal(
    <div className={styles.container}>
      <video />
      <div className={styles.toolbar}>
        {!isRecording && (
          <button onClick={startRecording}>Start recording</button>
        )}
        {isRecording && !isPaused && (
          <button onClick={stopRecording}>Stop recording</button>
        )}
        {isRecording && !isPaused && (
          <button onClick={pauseRecording}>Pause recording</button>
        )}
        {isRecording && isPaused && (
          <button onClick={resumeRecording}>Resume recording</button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PiPWindow;
