import cx from 'classnames';

import RecordButton from 'components/RecordButton';
import { useCountdown } from 'contexts/countdown';
import { useLayout } from 'contexts/layout';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';

import styles from './MainRecordButton.module.css';

const MainRecordButton = () => {
  const { countingDown, setCountingDown } = useCountdown();
  const { layout } = useLayout();
  const { isRecording } = useRecording();
  const { pipWindow, requestPipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  return (
    <RecordButton
      className={cx(styles.root, { [styles.recording]: isRecording })}
      classes={{ icon: styles.icon }}
      onClick={async () => {
        if (countingDown) {
          return;
        }
        if (isRecording) {
          pipWindow?.close();
        } else if (pipWindow) {
          setCountingDown(true);
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
