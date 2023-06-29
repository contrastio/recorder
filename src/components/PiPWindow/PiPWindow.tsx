import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import ResumeIcon from 'components/icons/Resume';
import ScreenRecordIcon from 'components/icons/ScreenRecord';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useUpdateVideoSource';

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
  const updateCameraSource = useVideoSource(cameraStream);
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
          ref={updateCameraSource}
          autoPlay
          playsInline
          muted
          controls={false}
        />
        <div className={styles.toolbar}>
          <Tooltip title={isRecording ? 'Finish recording' : 'Start recording'}>
            <IconButton
              color="error"
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                  exitPipWindow();
                } else {
                  startRecording();
                }
              }}
            >
              {isRecording ? <StopIcon /> : <ScreenRecordIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
            <span>
              <IconButton
                disabled={!isRecording}
                onClick={isPaused ? resumeRecording : pauseRecording}
              >
                {isPaused ? <ResumeIcon /> : <PauseIcon />}
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </div>
    </CacheProvider>,
    pipWindow.document.body
  );
};

export default PiPWindow;
