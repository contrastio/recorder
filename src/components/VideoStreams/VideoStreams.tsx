import cx from 'classnames';
import { useRef } from 'react';

import { useStreams } from 'contexts/streams';

import styles from './VideoStreams.module.css';

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
    <div
      className={cx(styles.root, {
        [styles.pip]: cameraStream && screenshareStream,
      })}
    >
      <video
        ref={cameraRef}
        className={styles.camera}
        autoPlay
        playsInline
        muted
        controls={false}
      />
      <video
        ref={screenshareRef}
        className={styles.screenshare}
        autoPlay
        playsInline
        muted
        controls={false}
      />
    </div>
  );
};

export default VideoStreams;
