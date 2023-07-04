import MicIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOffOutlined';
import VideocamOffIcon from '@mui/icons-material/VideocamOffOutlined';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Company from 'components/Company';
import RecordButton from 'components/RecordButton';
import { useMediaDevices } from 'contexts/mediaDevices';

import styles from './Footer.module.css';

const Footer = () => {
  const {
    cameras,
    cameraId,
    cameraEnabled,
    microphones,
    microphoneId,
    microphoneEnabled,
    setPreferredCamera,
    setCameraEnabled,
    setPreferredMicrophone,
    setMicrophoneEnabled,
  } = useMediaDevices();

  return (
    <footer className={styles.root}>
      <Company />
      <RecordButton />
      <div className={styles.devices}>
        <Select
          className={styles.device}
          classes={{ select: styles.select }}
          startAdornment={
            microphones.length && microphoneEnabled ? (
              <MicIcon onClick={() => setMicrophoneEnabled(false)} />
            ) : (
              <MicOffIcon onClick={() => setMicrophoneEnabled(true)} />
            )
          }
          value={microphoneId}
          onChange={(event) => setPreferredMicrophone(event.target.value)}
        >
          {microphones.length ? (
            microphones.map((microphone) => (
              <MenuItem key={microphone.deviceId} value={microphone.deviceId}>
                {microphone.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No microphones available
            </MenuItem>
          )}
        </Select>
        <Select
          className={styles.device}
          classes={{ select: styles.select }}
          startAdornment={
            cameras.length && cameraEnabled ? (
              <VideocamIcon onClick={() => setCameraEnabled(false)} />
            ) : (
              <VideocamOffIcon
                onClick={() => cameras.length && setCameraEnabled(true)}
              />
            )
          }
          value={cameraId}
          onChange={(event) => setPreferredCamera(event.target.value)}
        >
          {cameras.length ? (
            cameras.map((camera) => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No cameras available
            </MenuItem>
          )}
        </Select>
      </div>
    </footer>
  );
};

export default Footer;
