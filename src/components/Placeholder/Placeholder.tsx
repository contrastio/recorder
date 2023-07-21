import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useScreenshare } from 'contexts/screenshare';

import styles from './Placeholder.module.css';

const Placeholder = () => {
  const { startScreenshare } = useScreenshare();

  return (
    <div className={styles.root} data-mui-color-scheme="light">
      <Typography
        className={styles.title}
        variant="h5"
        color="secondary.contrastText"
      >
        Start sharing your screen to see it here
      </Typography>
      <Button startIcon={<PresentToAllIcon />} onClick={startScreenshare}>
        Share screen
      </Button>
    </div>
  );
};

export default Placeholder;
