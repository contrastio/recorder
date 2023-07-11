import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import { forwardRef } from 'react';

import styles from './PiPRecordButton.module.css';

type PiPRecordButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'color'
>;

const PiPRecordButton = (
  { className, ...props }: PiPRecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <IconButton className={cx(styles.root, className)} ref={ref} {...props}>
      <div className={styles.icon} />
    </IconButton>
  );
};

export default forwardRef(PiPRecordButton);
