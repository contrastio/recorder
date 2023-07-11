import cx from 'classnames';

import RecordButton from 'components/RecordButton';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';

import styles from './MainRecordButton.module.css';

const MainRecordButton = () => {
  const { isRecording, startRecording } = useRecording();
  const { pipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  return (
    <RecordButton
      className={cx(styles.root, { [styles.recording]: isRecording })}
      classes={{ icon: styles.icon }}
      onClick={() => {
        if (!isRecording && !pipWindow) {
          startScreenshare();
        } else if (!isRecording && pipWindow) {
          startRecording();
        } else if (isRecording && pipWindow) {
          pipWindow.close();
        }
      }}
    />
  );
};

export default MainRecordButton;
