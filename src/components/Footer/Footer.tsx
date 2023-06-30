import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ContrastLogo from 'components/icons/ContrastLogo';
import { useScreenshare } from 'contexts/screenshare';

import styles from './Footer.module.css';

const Footer = () => {
  const { startScreenshare } = useScreenshare();

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
        onClick={startScreenshare}
      >
        record
      </Button>
    </footer>
  );
};

export default Footer;
