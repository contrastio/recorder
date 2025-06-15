import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Button,
} from '@mui/material';

const Settings = () => {
  const [highQuality, setHighQuality] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Settings</h1>

      <Paper elevation={2} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Recording Settings
        </Typography>

        <FormControl component="fieldset" style={{ width: '100%' }}>
          <FormControlLabel
            control={
              <Switch
                checked={highQuality}
                onChange={() => setHighQuality(!highQuality)}
              />
            }
            label="High Quality Recording"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: '30px', marginBottom: '15px' }}
          >
            Enable for higher resolution and bitrate (uses more resources)
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={autoSave}
                onChange={() => setAutoSave(!autoSave)}
              />
            }
            label="Auto-Save Recordings"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: '30px', marginBottom: '15px' }}
          >
            Automatically save recordings when completed
          </Typography>
        </FormControl>
      </Paper>

      <Paper elevation={2} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>

        <FormControl component="fieldset" style={{ width: '100%' }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label="Dark Mode"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: '30px', marginBottom: '15px' }}
          >
            Use dark theme for the application
          </Typography>
        </FormControl>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '10px' }}
      >
        Save Settings
      </Button>

      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          color: '#0077cc',
          textDecoration: 'none',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Settings;
