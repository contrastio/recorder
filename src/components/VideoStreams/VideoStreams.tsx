import cx from 'classnames';
import { useState } from 'react';

import Placeholder from 'components/Placeholder';
import { useLayout } from 'contexts/layout';
import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useVideoSource';
import {
  CAMERA_BORDER_RADIUS,
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
  const { layout } = useLayout();
  const { cameraStream, screenshareStream } = useStreams();
  const updateCameraSource = useVideoSource(cameraStream);
  const updateScreenshareSource = useVideoSource(screenshareStream);
  const [screenshareSize, setScreenshareSize] =
    useState<ScreenshareSize | null>(null);

  if (!screenshareStream && screenshareSize) {
    setScreenshareSize(null);
  }
  const screenshareWidth = screenshareSize?.width ?? 1920;
  const screenshareHeight = screenshareSize?.height ?? 1080;

  return (
    <>
      {screenshareStream || layout === 'cameraOnly' ? (
        <video
          className={cx(styles.mainStream, {
            [styles.cameraStream]: layout === 'cameraOnly',
          })}
          ref={
            layout === 'cameraOnly'
              ? updateCameraSource
              : updateScreenshareSource
          }
          autoPlay
          playsInline
          muted
          // The 'resize' event exists on HTMLMediaElement and is exactly what we need here:
          // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
          //
          // Issue created: https://github.com/jsx-eslint/eslint-plugin-react/issues/3594
          //
          // eslint-disable-next-line react/no-unknown-property
          onResize={(event) => {
            if (layout !== 'cameraOnly') {
              setScreenshareSize({
                width: event.currentTarget.videoWidth,
                height: event.currentTarget.videoHeight,
              });
            }
          }}
        />
      ) : (
        <Placeholder />
      )}

      {/*
        If the screenshare stream is defined but its size hasn't been retrieved yet,
        we don't render the camera stream
      */}
      {layout === 'screenAndCamera' &&
        cameraStream &&
        (!screenshareStream || screenshareSize) && (
          <video
            className={cx(styles.pipStream, styles.cameraStream)}
            ref={updateCameraSource}
            style={{
              right: percentage(CAMERA_MARGIN_RIGHT / screenshareWidth),
              bottom: percentage(CAMERA_MARGIN_BOTTOM / screenshareHeight),
              width: percentage(CAMERA_WIDTH / screenshareWidth),
              height: percentage(CAMERA_HEIGHT / screenshareHeight),
              borderRadius: [
                percentage(CAMERA_BORDER_RADIUS / CAMERA_WIDTH),
                percentage(CAMERA_BORDER_RADIUS / CAMERA_HEIGHT),
              ].join('/'),
            }}
            autoPlay
            playsInline
            muted
          />
        )}
    </>
  );
};

export default VideoStreams;
