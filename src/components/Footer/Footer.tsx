import MicIcon from '@mui/icons-material/MicNone';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import ContrastLogo from 'components/icons/ContrastLogo';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useScreenshare } from 'contexts/screenshare';
import { useStreams } from 'contexts/streams';

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
  const { cameraStream, setCameraStream } = useStreams();
  const { isRecording, startRecording } = useRecording();
  const { pipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenshare();

  // TODO Extract devices management
  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [videoInputId, setVideoInputId] = useState('');
  const [audioInputId, setAudioInputId] = useState('');

  const cameraStreamRef = useRef(cameraStream);
  const videoInputIdRef = useRef(videoInputId);
  const audioInputIdRef = useRef(audioInputId);
  cameraStreamRef.current = cameraStream;
  videoInputIdRef.current = videoInputId;
  audioInputIdRef.current = audioInputId;

  const getCamera = useCallback(
    async (videoInputId: string, audioInputId: string) => {
      if (
        videoInputId === videoInputIdRef.current &&
        audioInputId === audioInputIdRef.current
      ) {
        return;
      }
      let cameraStream: MediaStream | null = null;
      if (videoInputId || audioInputId) {
        // TODO Avoid loosing the current camera/microphone while switching
        //      Can't rely on applyConstraints so would need to handle
        //      2 separated streams if needed
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: videoInputId
            ? {
                deviceId: videoInputId,
                aspectRatio: 16 / 9,
                width: 3840,
                height: 2160,
              }
            : false,
          audio: audioInputId
            ? {
                deviceId: audioInputId,
              }
            : false,
        });
      }
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStream(cameraStream);
    },
    [setCameraStream]
  );

  useEffect(() => {
    const updateInputId = (
      inputs: MediaDeviceInfo[],
      preferredInputId: string,
      setInputId: React.Dispatch<React.SetStateAction<string>>
    ) => {
      let inputId = '';
      if (inputs.some((input) => input.deviceId === preferredInputId)) {
        inputId = preferredInputId;
      } else if (inputs.some((input) => input.deviceId === 'default')) {
        inputId = 'default';
      } else if (inputs.length) {
        inputId = inputs[0].deviceId;
      }
      setInputId(inputId);
      return inputId;
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
      const preferences = getDevicePreferences();
      setVideoInputs(videoInputs);
      setAudioInputs(audioInputs);
      const videoInputId = updateInputId(
        videoInputs,
        preferences.videoInputId,
        setVideoInputId
      );
      const audioInputId = updateInputId(
        audioInputs,
        preferences.audioInputId,
        setAudioInputId
      );
      await getCamera(videoInputId, audioInputId);
    };

    (async () => {
      await requestDevicesPermissions();
      await updateDevices();
    })();

    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, [getCamera]);

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
          onChange={async (event) => {
            const audioInputId = event.target.value;
            updateDevicePreferences({ audioInputId });
            setAudioInputId(audioInputId);
            await getCamera(videoInputId, audioInputId);
          }}
        >
          {/* TODO Handle no devices detected */}
          {audioInputs.map((audioInput) => (
            <MenuItem key={audioInput.deviceId} value={audioInput.deviceId}>
              {audioInput.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          startAdornment={<VideocamIcon />}
          value={videoInputId}
          onChange={async (event) => {
            const videoInputId = event.target.value;
            updateDevicePreferences({ videoInputId });
            setVideoInputId(videoInputId);
            await getCamera(videoInputId, audioInputId);
          }}
        >
          {/* TODO Handle no devices detected */}
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
