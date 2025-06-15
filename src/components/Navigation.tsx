import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color={isActive('/') ? 'primary' : 'inherit'}
            startIcon={<HomeIcon />}
            sx={{ fontWeight: isActive('/') ? 'bold' : 'normal' }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/record"
            color={isActive('/record') ? 'primary' : 'inherit'}
            startIcon={<VideocamIcon />}
            sx={{ fontWeight: isActive('/record') ? 'bold' : 'normal' }}
          >
            Record
          </Button>

          <Button
            component={Link}
            to="/about"
            color={isActive('/about') ? 'primary' : 'inherit'}
            startIcon={<InfoIcon />}
            sx={{ fontWeight: isActive('/about') ? 'bold' : 'normal' }}
          >
            About
          </Button>

          <Button
            component={Link}
            to="/settings"
            color={isActive('/settings') ? 'primary' : 'inherit'}
            startIcon={<SettingsIcon />}
            sx={{ fontWeight: isActive('/settings') ? 'bold' : 'normal' }}
          >
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
