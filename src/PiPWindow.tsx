import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useRecording } from "./contexts/recording";
import { useStreams } from "./contexts/streams";

import styles from "./PiPWindow.module.scss";

const requestPipWindow = async () => {
  return await (window as any).documentPictureInPicture.requestWindow({
    width: 300,
    height: 300,
  });
};

const PiPWindow = () => {
  const {
    isRecording,
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording();

  const { cameraStream, screenshareStream } = useStreams();

  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoElement = videoRef.current;
  if (cameraStream && videoElement) {
    videoElement.srcObject = cameraStream;
  }

  // FIXME request PiP directly on user action to prevent the error
  //       "Document PiP requires user activation"
  useEffect(() => {
    if (!screenshareStream) return;

    requestPipWindow().then((pipWindow) => {
      const allCSS = [...document.styleSheets]
        .map((styleSheet) =>
          [...styleSheet.cssRules].map((r) => r.cssText).join("")
        )
        .filter(Boolean)
        .join("\n");
      const style = document.createElement("style");
      style.textContent = allCSS;
      pipWindow.document.head.appendChild(style);

      setPipWindow(pipWindow);
    });
  }, [screenshareStream, startRecording, stopRecording]);

  if (!pipWindow) return null;

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
    pipWindow.document.body
  );
};

export default PiPWindow;
