import Typography from '@mui/material/Typography';

import ContrastLogo from 'components/icons/ContrastLogo';

import styles from './Company.module.css';

const Company = () => {
  // TODO Link to contrast website
  return (
    <Typography component="span" variant="subtitle2" color="text.secondary">
      Powered by{' '}
      <span className={styles.companyName}>
        c<ContrastLogo className={styles.logo} />
        ntrast
      </span>
    </Typography>
  );
};

export default Company;
