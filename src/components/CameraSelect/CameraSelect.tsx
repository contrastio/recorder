import VideocamOffIcon from '@mui/icons-material/VideocamOffOutlined';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import MenuItem from '@mui/material/MenuItem';

import DeviceSelect from 'components/DeviceSelect';
import { useMediaDevices } from 'contexts/mediaDevices';

const CameraSelect = () => {
  const {
    cameras,
    cameraId,
    cameraEnabled,
    setPreferredCamera,
    setCameraEnabled,
  } = useMediaDevices();

  return (
    <DeviceSelect
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
    </DeviceSelect>
  );
};

export default CameraSelect;
