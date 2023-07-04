import MicIcon from '@mui/icons-material/MicNone';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import cx from 'classnames';

import ContrastLogo from 'components/icons/ContrastLogo';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';
import useMediaDevices from 'hooks/useMediaDevices';

import styles from './Footer.module.css';

const Footer = () => {
  const { isRecording, startRecording } = useRecording();
  const { pipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();
  const {
    cameras,
    cameraId,
    microphones,
    microphoneId,
    setPreferredCamera,
    setPreferredMicrophone,
  } = useMediaDevices();

  return (
    <footer className={cx(styles.root, { [styles.recording]: isRecording })}>
      {/* TODO Link to contrast website */}
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Powered by{' '}
        <span className={styles.companyName}>
          c<ContrastLogo className={styles.companyLogo} />
          ntrast
        </span>
      </Typography>
      <IconButton
        className={styles.recordButton}
        onClick={() => {
          if (!isRecording && !pipWindow) {
            startScreenshare();
          } else if (!isRecording && pipWindow) {
            startRecording();
          } else if (isRecording && pipWindow) {
            pipWindow.close();
          }
        }}
      >
        <div className={styles.recordIcon} />
      </IconButton>
      <div className={styles.devices}>
        <Select
          startAdornment={<MicIcon />}
          value={microphoneId}
          onChange={(event) => setPreferredMicrophone(event.target.value)}
        >
          {/* TODO Handle no microphones detected */}
          {microphones.map((microphone) => (
            <MenuItem key={microphone.deviceId} value={microphone.deviceId}>
              {microphone.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          startAdornment={<VideocamIcon />}
          value={cameraId}
          onChange={(event) => setPreferredCamera(event.target.value)}
        >
          {/* TODO Handle no cameras detected */}
          {cameras.map((camera) => (
            <MenuItem key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </footer>
  );
};

export default Footer;
