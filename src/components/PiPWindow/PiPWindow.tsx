import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
  const { pipWindow, exitPipWindow } = usePictureInPicture();

  const cssCacheRef = useRef<EmotionCache | null>(null);

  if (!pipWindow) {
    cssCacheRef.current = null;
    return null;
  }

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
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.srcObject = cameraStream;
            }
          }}
          autoPlay
          playsInline
          muted
          controls={false}
        />
        <div className={styles.toolbar}>
          {isRecording ? (
            <>
              <Tooltip title="Finish recording">
                <IconButton
                  color="error"
                  onClick={() => {
                    stopRecording();
                    exitPipWindow();
                  }}
                >
                  <StopIcon />
                </IconButton>
              </Tooltip>
              {isPaused ? (
                <Tooltip title="Resume">
                  <IconButton onClick={resumeRecording}>
                    <PlayIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Pause">
                  <IconButton onClick={pauseRecording}>
                    <PauseIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ) : (
            <Tooltip title="Start recording">
              <IconButton onClick={startRecording}>
                <PlayIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </CacheProvider>,
    pipWindow.document.body
  );
};

export default PiPWindow;
