import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';

import CameraSelect from 'components/CameraSelect';
import MainRecordButton from 'components/MainRecordButton';
import MicrophoneSelect from 'components/MicrophoneSelect';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <Button
        href="https://github.com/contrastio/recorder"
        startIcon={<GitHubIcon />}
      >
        Star on GitHub
      </Button>
      <MainRecordButton />
      <div className={styles.devices}>
        <MicrophoneSelect />
        <CameraSelect />
      </div>
    </footer>
  );
};

export default Footer;
