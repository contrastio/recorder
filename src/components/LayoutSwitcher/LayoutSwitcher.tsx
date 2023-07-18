import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ScreenAndCameraIcon from './ScreenAndCameraIcon';
import ScreenIcon from './ScreenIcon';

import styles from './LayoutSwitcher.module.css';

const LayoutSwitcher = () => {
  return (
    <ToggleButtonGroup className={styles.root}>
      <ToggleButton value="screenOnly">
        <ScreenIcon />
        Screen only
      </ToggleButton>
      <ToggleButton value="screenAndCamera">
        <ScreenAndCameraIcon />
        Screen and camera
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LayoutSwitcher;
