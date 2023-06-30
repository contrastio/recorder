import cx from 'classnames';
import { useState } from 'react';

import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useUpdateVideoSource';
import {
  CAMERA_HEIGHT,
  CAMERA_MARGIN_BOTTOM,
  CAMERA_MARGIN_RIGHT,
  CAMERA_WIDTH,
} from 'services/composer';
import { percentage } from 'services/format/number';

import styles from './VideoStreams.module.css';

type ScreenshareSize = {
  width: number;
  height: number;
};

const VideoStreams = () => {
  const { cameraStream, screenshareStream } = useStreams();
  const updateCameraSource = useVideoSource(cameraStream);
  const updateScreenshareSource = useVideoSource(screenshareStream);
  const [screenshareSize, setScreenshareSize] = useState<ScreenshareSize>({
    width: 1,
    height: 1,
  });

  return (
    <main
      className={cx(styles.root, { [styles.placeholder]: !screenshareStream })}
    >
      <div className={styles.preview}>
        {screenshareStream && (
          <video
            ref={updateScreenshareSource}
            className={styles.screenshare}
            autoPlay
            playsInline
            muted
            controls={false}
            // The 'resize' event exists on HTMLMediaElement and is exactly what we need here:
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
            //
            // Issue created: https://github.com/jsx-eslint/eslint-plugin-react/issues/3594
            //
            // eslint-disable-next-line react/no-unknown-property
            onResize={(event) => {
              setScreenshareSize({
                width: event.currentTarget.videoWidth,
                height: event.currentTarget.videoHeight,
              });
            }}
          />
        )}
        {cameraStream && (
          <video
            ref={updateCameraSource}
            className={styles.camera}
            style={{
              right: percentage(CAMERA_MARGIN_RIGHT / screenshareSize.width),
              bottom: percentage(CAMERA_MARGIN_BOTTOM / screenshareSize.height),
              width: percentage(CAMERA_WIDTH / screenshareSize.width),
              height: percentage(CAMERA_HEIGHT / screenshareSize.height),
            }}
            autoPlay
            playsInline
            muted
            controls={false}
          />
        )}
      </div>
    </main>
  );
};

export default VideoStreams;
