import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ContrastLogo from 'components/icons/ContrastLogo';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';

import styles from './Footer.module.css';

const Footer = () => {
  const { screenshareStream, setScreenshareStream } = useStreams();
  const { requestPipWindow, exitPipWindow } = usePictureInPicture();

  const getScreenShare = async () => {
    await requestPipWindow();
    try {
      if (screenshareStream) {
        screenshareStream.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      stream.getVideoTracks()[0].onended = () => {
        setScreenshareStream(null);
        exitPipWindow();
      };
      setScreenshareStream(stream);
    } catch {
      // Happens when the user aborts the screenshare
      exitPipWindow();
    }
  };

  return (
    <footer className={styles.root}>
      {/* TODO Link to contrast website */}
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Powered by{' '}
        <span className={styles.companyName}>
          c<ContrastLogo className={styles.logo} />
          ntrast
        </span>
      </Typography>
      <Button
        className={styles.recordButton}
        color="primary"
        startIcon={<ContrastLogo className={styles.logo} />}
        onClick={getScreenShare}
      >
        record
      </Button>
    </footer>
  );
};

export default Footer;
