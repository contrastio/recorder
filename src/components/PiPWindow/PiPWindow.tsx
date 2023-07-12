import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import PiPRecordButton from 'components/PiPRecordButton';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useVideoSource';
import { formatDuration } from 'services/format/duration';

import styles from './PiPWindow.module.css';

type PiPWindowProps = {
  pipWindow: Window;
};

const PiPWindow = ({ pipWindow }: PiPWindowProps) => {
  const {
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording();

  const { cameraStream } = useStreams();
  const updateCameraSource = useVideoSource(cameraStream);

  const cssCacheRef = useRef<EmotionCache | null>(null);
  if (!cssCacheRef.current) {
    cssCacheRef.current = createCache({
      key: 'external',
      container: pipWindow.document.body,
    });
  }

  const [previousDuration, setPreviousDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    if (!isRecording || isPaused) {
      return;
    }

    const updateTime = (time: number) => {
      setLastTime(time);
      requestId = requestAnimationFrame(updateTime);
    };

    let requestId = requestAnimationFrame(updateTime);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [isPaused, isRecording]);

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
            <PiPRecordButton
              onClick={() => {
                startRecording();
                const now = performance.now();
                setStartTime(now);
                setLastTime(now);
              }}
            />
          </Tooltip>
        ) : (
          <div className={styles.controls}>
            <Typography className={styles.duration} variant="subtitle2">
              {formatDuration(previousDuration + lastTime - startTime)}
            </Typography>
            <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
              <IconButton
                color={isPaused ? 'primary' : 'default'}
                onClick={() => {
                  if (isPaused) {
                    resumeRecording();
                    const now = performance.now();
                    setStartTime(now);
                    setLastTime(now);
                  } else {
                    setPreviousDuration(
                      previousDuration + performance.now() - startTime
                    );
                    setStartTime(0);
                    setLastTime(0);
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
    pipWindow.document.body
  );
};

export default PiPWindow;
