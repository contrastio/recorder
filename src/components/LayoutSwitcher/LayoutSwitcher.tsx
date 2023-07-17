import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ScreenIcon from './ScreenIcon';

import styles from './LayoutSwitcher.module.css';

const LayoutSwitcher = () => {
  return (
    <ToggleButtonGroup className={styles.root}>
      <ToggleButton value="screenOnly">
        <ScreenIcon />
        Screen only
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LayoutSwitcher;
