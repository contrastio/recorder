import { useRef } from "react";

import { useStreams } from "./contexts/streams";

import styles from "./VideoStreams.module.scss";

const VideoStreams = () => {
  const cameraRef = useRef<HTMLVideoElement | null>(null);
  const screenshareRef = useRef<HTMLVideoElement | null>(null);
  const { cameraStream, screenshareStream } = useStreams();

  // Add camera
  const cameraVideoElement = cameraRef.current;
  if (cameraStream && cameraVideoElement)
    cameraVideoElement.srcObject = cameraStream;

  // Add screenshare
  const screenshareVideoElement = screenshareRef.current;
  if (screenshareStream && screenshareVideoElement)
    screenshareVideoElement.srcObject = screenshareStream;

  return (
    <div className={styles.container}>
      <video ref={cameraRef} autoPlay playsInline muted controls={false} />
      <video ref={screenshareRef} autoPlay playsInline muted controls={false} />
    </div>
  );
};

export default VideoStreams;
