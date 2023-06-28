import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';

import styles from './PiPWindow.module.css';

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
  const { pipWindow } = usePictureInPicture();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cssCacheRef = useRef<EmotionCache>();

  const videoElement = videoRef.current;
  if (cameraStream && videoElement) {
    videoElement.srcObject = cameraStream;
  }

  if (!pipWindow) return null;

  if (!cssCacheRef.current) {
    cssCacheRef.current = createCache({
      key: 'external',
      container: pipWindow.document.body,
    });
  }

  return createPortal(
    <CacheProvider value={cssCacheRef.current}>
      <div className={styles.root}>
        <video
          className={styles.camera}
          autoPlay
          playsInline
          muted
          controls={false}
          ref={videoRef}
        />
        <div className={styles.toolbar}>
          <Button size="small" onClick={startRecording} disabled={isRecording}>
            Start
          </Button>
          <Button size="small" onClick={stopRecording} disabled={!isRecording}>
            Stop
          </Button>
          <Button
            size="small"
            onClick={pauseRecording}
            disabled={!isRecording || isPaused}
          >
            Pause
          </Button>
          <Button
            size="small"
            onClick={resumeRecording}
            disabled={!isRecording || !isPaused}
          >
            Resume
          </Button>
        </div>
      </div>
    </CacheProvider>,
    pipWindow.document.body
  );
};

export default PiPWindow;
