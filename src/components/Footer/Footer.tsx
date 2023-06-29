import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ContrastLogo from 'components/icons/ContrastLogo';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
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
      >
        record
      </Button>
    </footer>
  );
};

export default Footer;
