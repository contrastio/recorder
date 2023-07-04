import Select, { SelectProps } from '@mui/material/Select';

import styles from './DeviceSelect.module.css';

const DeviceSelect = (props: SelectProps<string>) => {
  return (
    <Select
      className={styles.root}
      classes={{ select: styles.select }}
      {...props}
    />
  );
};

export default DeviceSelect;
