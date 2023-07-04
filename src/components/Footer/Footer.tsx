import CameraSelect from 'components/CameraSelect';
import Company from 'components/Company';
import MicrophoneSelect from 'components/MicrophoneSelect';
import RecordButton from 'components/RecordButton';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <Company />
      <RecordButton />
      <div className={styles.devices}>
        <MicrophoneSelect />
        <CameraSelect />
      </div>
    </footer>
  );
};

export default Footer;
