import cx from 'classnames';

import { useStreams } from 'contexts/streams';

import styles from './VideoStreams.module.css';

const VideoStreams = () => {
  const { cameraStream, screenshareStream } = useStreams();

  return (
    <div
      className={cx(styles.root, { [styles.placeholder]: !screenshareStream })}
    >
      <div className={styles.preview}>
        {screenshareStream && (
          <video
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.srcObject = screenshareStream;
              }
            }}
            className={styles.screenshare}
            autoPlay
            playsInline
            muted
            controls={false}
          />
        )}
        {cameraStream && (
          // TODO Render with the same ratio compared to the screenshare
          <video
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.srcObject = cameraStream;
              }
            }}
            className={styles.camera}
            autoPlay
            playsInline
            muted
            controls={false}
          />
        )}
      </div>
    </div>
  );
};

export default VideoStreams;
