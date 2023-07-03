import MicIcon from '@mui/icons-material/MicNone';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import ContrastLogo from 'components/icons/ContrastLogo';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';

import styles from './Footer.module.css';

// TODO Extract preferences management
const localStorageKey = 'devicePreferences';

type DevicePreferences = {
  videoInputId: string;
  audioInputId: string;
};

const getDevicePreferences = (): DevicePreferences => {
  const devicePreferences = localStorage.getItem(localStorageKey);
  const { videoInputId = '', audioInputId = '' }: DevicePreferences =
    devicePreferences ? JSON.parse(devicePreferences) : {};

  return { videoInputId, audioInputId };
};

const updateDevicePreferences = (
  devicePreferences: Partial<DevicePreferences>
) => {
  const previousDevicePreferences = getDevicePreferences();
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ ...previousDevicePreferences, ...devicePreferences })
  );
};

const requestDevicesPermissions = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    mediaStream.getTracks().forEach((track) => track.stop());
  } catch (error) {
    console.warn('Devices permissions denied', error);
  }
};

const Footer = () => {
  const { isRecording, startRecording } = useRecording();
  const { pipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  // TODO Extract devices management
  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [videoInputId, setVideoInputId] = useState('');
  const [audioInputId, setAudioInputId] = useState('');

  useEffect(() => {
    const updateInputId = (
      inputs: MediaDeviceInfo[],
      preferredInputId: string,
      setInputId: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (inputs.some((input) => input.deviceId === preferredInputId)) {
        setInputId(preferredInputId);
      } else if (inputs.some((input) => input.deviceId === 'default')) {
        setInputId('default');
      } else if (inputs.length) {
        setInputId(inputs[0].deviceId);
      } else {
        setInputId('');
      }
    };

    const updateDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(
        (device) =>
          device.kind === 'videoinput' && device.deviceId && device.label
      );
      const audioInputs = devices.filter(
        (device) =>
          device.kind === 'audioinput' && device.deviceId && device.label
      );
      const { videoInputId, audioInputId } = getDevicePreferences();
      setVideoInputs(videoInputs);
      setAudioInputs(audioInputs);
      updateInputId(videoInputs, videoInputId, setVideoInputId);
      updateInputId(audioInputs, audioInputId, setAudioInputId);
    };

    (async () => {
      await requestDevicesPermissions();
      await updateDevices();
    })();

    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, []);

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
          value={audioInputId}
          onChange={(event) => {
            const audioInputId = event.target.value;
            updateDevicePreferences({ audioInputId });
            setAudioInputId(audioInputId);
          }}
        >
          {audioInputs.map((audioInput) => (
            <MenuItem key={audioInput.deviceId} value={audioInput.deviceId}>
              {audioInput.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          startAdornment={<VideocamIcon />}
          value={videoInputId}
          onChange={(event) => {
            const videoInputId = event.target.value;
            updateDevicePreferences({ videoInputId });
            setVideoInputId(videoInputId);
          }}
        >
          {videoInputs.map((videoInput) => (
            <MenuItem key={videoInput.deviceId} value={videoInput.deviceId}>
              {videoInput.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </footer>
  );
};

export default Footer;
