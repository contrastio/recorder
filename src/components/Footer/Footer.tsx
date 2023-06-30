import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';

import ContrastLogo from 'components/icons/ContrastLogo';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';

import styles from './Footer.module.css';

const Footer = () => {
  const { screenshareStream, setScreenshareStream } = useStreams();
  const { pipWindow, requestPipWindow } = usePictureInPicture();

  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const onRecordButtonClick = async () => {
    if (!pipWindowRef.current) {
      pipWindowRef.current = await requestPipWindow();
    }
    if (screenshareStream) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      stream.getVideoTracks()[0].onended = () => {
        setScreenshareStream(null);
        pipWindowRef.current?.close();
      };
      setScreenshareStream(stream);
    } catch {
      // Happens when the user aborts the screenshare
      pipWindowRef.current?.close();
    }
  };

  return (
    <footer className={styles.root}>
      {/* TODO Link to contrast website */}
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Powered by{' '}
        <span className={styles.companyName}>
          c<ContrastLogo className={styles.companyLogo} />
          ntrast
        </span>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ContrastLogo />}
        onClick={onRecordButtonClick}
      >
        record
      </Button>
    </footer>
  );
};

export default Footer;
