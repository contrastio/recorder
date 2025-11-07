import CameraSelect from 'components/CameraSelect';
import GitHubButton from 'components/GitHubButton';
import MainRecordButton from 'components/MainRecordButton';
import MicrophoneSelect from 'components/MicrophoneSelect';
import TabAudioIndicator from 'components/TabAudioIndicator';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <GitHubButton />
      <MainRecordButton />
      <div className={styles.devices}>
        <MicrophoneSelect />
        <CameraSelect />
        <TabAudioIndicator />
      </div>
    </footer>
  );
};

export default Footer;
