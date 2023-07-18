import cx from 'classnames';

import RecordButton from 'components/RecordButton';
import { useLayout } from 'contexts/layout';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';

import styles from './MainRecordButton.module.css';

const MainRecordButton = () => {
  const { layout } = useLayout();
  const { isRecording, startRecording } = useRecording();
  const { pipWindow, requestPipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  return (
    <RecordButton
      className={cx(styles.root, { [styles.recording]: isRecording })}
      classes={{ icon: styles.icon }}
      onClick={async () => {
        if (isRecording) {
          pipWindow?.close();
        } else if (pipWindow) {
          startRecording();
        } else if (layout === 'cameraOnly') {
          await requestPipWindow();
        } else {
          await startScreenshare();
        }
      }}
    />
  );
};

export default MainRecordButton;
