import IconButton from '@mui/material/IconButton';
import cx from 'classnames';

import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';

import styles from './RecordButton.module.css';

const RecordButton = () => {
  const { isRecording, startRecording } = useRecording();
  const { pipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  return (
    <IconButton
      className={cx(styles.root, { [styles.recording]: isRecording })}
      onClick={() => {
        if (!isRecording && !pipWindow) {
          startScreenshare();
        } else if (!isRecording && pipWindow) {
          startRecording();
        } else if (isRecording && pipWindow) {
          pipWindow.close();
        }
      }}
    >
      <div className={styles.icon} />
    </IconButton>
  );
};

export default RecordButton;
