/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MicIcon from '@mui/icons-material/Mic';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartRecording = () => {
    navigate('/record');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          borderRadius: 2,
          color: 'white',
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Simple Screen & Camera Recorder
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Record your screen, camera, or both with just a few clicks
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleStartRecording}
          startIcon={<VideocamIcon />}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: '1.2rem',
            backgroundColor: 'white',
            color: '#2196F3',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Start Recording
        </Button>
      </Box>

      {/* Features Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mb: 4, textAlign: 'center' }}
      >
        Key Features
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <VideocamIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
            <Typography variant="h6" component="h3" gutterBottom>
              Camera Recording
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              High-quality webcam recording with adjustable settings. Perfect
              for creating video messages or tutorials.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ScreenShareIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
            <Typography variant="h6" component="h3" gutterBottom>
              Screen Capture
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Capture your entire screen or specific windows. Ideal for creating
              tutorials, demos, or presentations.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <MicIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
            <Typography variant="h6" component="h3" gutterBottom>
              Audio Recording
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Crystal clear audio recording with your videos. Toggle microphone
              on/off with a simple keyboard shortcut.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* How It Works Section */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mb: 4, textAlign: 'center' }}
        >
          How It Works
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2,
                  fontWeight: 'bold',
                }}
              >
                1
              </Box>
              <Typography variant="h6">Click "Start Recording"</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 7 }}>
              Navigate to the recording interface with a single click
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2,
                  fontWeight: 'bold',
                }}
              >
                2
              </Box>
              <Typography variant="h6">Choose Your Layout</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 7 }}>
              Select camera only, screen only, or picture-in-picture mode
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2,
                  fontWeight: 'bold',
                }}
              >
                3
              </Box>
              <Typography variant="h6">Record & Save</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 7 }}>
              Start recording and save your video when finished
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h5" component="p" gutterBottom>
          Ready to create amazing videos?
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleStartRecording}
          startIcon={<VideocamIcon />}
          sx={{ mt: 2, py: 1.5, px: 4 }}
        >
          Start Recording Now
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
