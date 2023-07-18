import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import PiPRecordButton from 'components/PiPRecordButton';
import { useLayout } from 'contexts/layout';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import useStopWatch from 'hooks/useStopWatch';
import useVideoSource from 'hooks/useVideoSource';
import { formatDuration } from 'services/format/duration';

import styles from './PiPWindow.module.css';

type PiPWindowProps = {
  pipWindow: Window;
};

const PiPWindow = ({ pipWindow }: PiPWindowProps) => {
  const { layout } = useLayout();
  const {
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording();

  const { cameraStream } = useStreams();
  const updateCameraSource = useVideoSource(cameraStream);
  const stopWatch = useStopWatch();

  const cssCacheRef = useRef<EmotionCache | null>(null);
  if (!cssCacheRef.current) {
    cssCacheRef.current = createCache({
      key: 'external',
      container: pipWindow.document.body,
    });
  }

  return createPortal(
    <CacheProvider value={cssCacheRef.current}>
      <div className={styles.root}>
        {layout !== 'screenOnly' && (
          <video
            className={styles.camera}
            ref={updateCameraSource}
            autoPlay
            playsInline
            muted
            controls={false}
          />
        )}
        {!isRecording ? (
          <Tooltip title="Start recording">
            <PiPRecordButton
              onCountdownEnd={() => {
                startRecording();
                stopWatch.start();
              }}
            />
          </Tooltip>
        ) : (
          <div className={styles.controls}>
            <Typography className={styles.duration} variant="subtitle2">
              {formatDuration(stopWatch.elapsed)}
            </Typography>
            <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
              <IconButton
                color={isPaused ? 'primary' : 'default'}
                onClick={() => {
                  if (isPaused) {
                    resumeRecording();
                    stopWatch.start();
                  } else {
                    stopWatch.stop();
                    pauseRecording();
                  }
                }}
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
    pipWindow.document.body,
  );
};

export default PiPWindow;
