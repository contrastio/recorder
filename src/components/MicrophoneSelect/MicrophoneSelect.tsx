import MicIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOffOutlined';
import MenuItem from '@mui/material/MenuItem';

import DeviceSelect from 'components/DeviceSelect';
import { useMediaDevices } from 'contexts/mediaDevices';

const MicrophoneSelect = () => {
  const {
    microphones,
    microphoneId,
    microphoneEnabled,
    setPreferredMicrophone,
    setMicrophoneEnabled,
  } = useMediaDevices();

  return (
    <DeviceSelect
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
    </DeviceSelect>
  );
};

export default MicrophoneSelect;
