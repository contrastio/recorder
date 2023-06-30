import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from './Placeholder.module.css';

const Placeholder = () => {
  return (
    <div className={styles.root} data-mui-color-scheme="light">
      <Typography
        className={styles.title}
        variant="h5"
        color="secondary.contrastText"
      >
        Don&apos;t leave it empty
      </Typography>
      <Button startIcon={<PresentToAllIcon />}>Share screen</Button>
    </div>
  );
};

export default Placeholder;
