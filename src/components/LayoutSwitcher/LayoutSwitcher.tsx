import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Layout, useLayout } from 'contexts/layout';

import CameraOnlyIcon from './icons/CameraOnlyIcon';
import ScreenAndCameraIcon from './icons/ScreenAndCameraIcon';
import ScreenOnlyIcon from './icons/ScreenOnlyIcon';

import styles from './LayoutSwitcher.module.css';

const LayoutSwitcher = () => {
  const { layout, setLayout } = useLayout();

  return (
    <ToggleButtonGroup
      className={styles.root}
      exclusive
      value={layout}
      onChange={(_, layout: Layout | null) => {
        if (layout !== null) {
          setLayout(layout);
        }
      }}
    >
      <ToggleButton value="screenOnly">
        <ScreenOnlyIcon />
        Screen only
      </ToggleButton>
      <ToggleButton value="screenAndCamera">
        <ScreenAndCameraIcon />
        Screen and camera
      </ToggleButton>
      <ToggleButton value="cameraOnly">
        <CameraOnlyIcon />
        Camera only
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LayoutSwitcher;
