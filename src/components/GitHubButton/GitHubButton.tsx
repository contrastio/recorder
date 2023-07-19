import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';

const GitHubButton = () => {
  return (
    <Button
      href="https://github.com/contrastio/recorder"
      target="_blank"
      startIcon={<GitHubIcon />}
    >
      Star on GitHub
    </Button>
  );
};

export default GitHubButton;
