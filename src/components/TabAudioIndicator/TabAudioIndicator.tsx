import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';

import { useStreams } from 'contexts/streams';

import styles from './TabAudioIndicator.module.css';

const TabAudioIndicator = () => {
  const { tabAudioStream } = useStreams();

  if (!tabAudioStream) {
    return null;
  }

  return (
    <Tooltip title="Tab audio is being recorded">
      <div className={styles.root}>
        <VolumeUpIcon className={styles.icon} />
        <span className={styles.text}>Tab Audio</span>
      </div>
    </Tooltip>
  );
};

export default TabAudioIndicator;
