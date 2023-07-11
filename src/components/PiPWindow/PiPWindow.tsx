import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import PiPRecordButton from 'components/PiPRecordButton/PiPRecordButton';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useVideoSource';

import styles from './PiPWindow.module.css';

const PiPWindow = () => {
  const {
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording();

  const { cameraStream } = useStreams();
  const updateCameraSource = useVideoSource(cameraStream);
  const { pipWindow } = usePictureInPicture();

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
          ref={updateCameraSource}
          autoPlay
          playsInline
          muted
          controls={false}
        />
        {!isRecording ? (
          <Tooltip title="Start recording">
            <PiPRecordButton onClick={startRecording} />
          </Tooltip>
        ) : (
          <div className={styles.controls}>
            <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
              <IconButton
                color={isPaused ? 'primary' : 'default'}
                onClick={isPaused ? resumeRecording : pauseRecording}
              >
                {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Stop">
              <IconButton
                color={isPaused ? 'default' : 'primary'}
                onClick={pipWindow.close}
              >
                <StopIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </CacheProvider>,
    pipWindow.document.body
  );
};

export default PiPWindow;
