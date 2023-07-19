import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import chromeIcon from 'assets/chrome.svg';

import styles from './BrowserNotSupported.module.css';

const BrowserNotSupported = () => {
  return (
    <div className={styles.root}>
      <Typography variant="h6">
        This browser doesn&apos;t support Document Picture-in-Picture and
        Insertable Streams APIs.
      </Typography>
      <Typography variant="subtitle1">
        For the moment, recordings can be created only with:
      </Typography>
      <Link
        className={styles.chromeLink}
        href="https://www.google.com/chrome/"
        target="_blank"
        color="secondary"
        underline="none"
      >
        <img className={styles.chromeIcon} src={chromeIcon} />
        Google Chrome
      </Link>
    </div>
  );
};

export default BrowserNotSupported;
