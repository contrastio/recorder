import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';

import styles from './GitHubButton.module.css';

const GitHubButton = () => {
  return (
    <Button
      className={styles.root}
      href="https://github.com/QuocVietHa08/recorder"
      target="_blank"
      startIcon={<GitHubIcon />}
    >
      Star on GitHub
    </Button>
  );
};

export default GitHubButton;
