import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import { forwardRef } from 'react';

import styles from './RecordButton.module.css';

type RecordButtonClasses = {
  icon: string;
};

export type RecordButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'color'
> & {
  classes?: Partial<RecordButtonClasses>;
};

const RecordButton = (
  { className, classes, ...props }: RecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <IconButton className={cx(styles.root, className)} ref={ref} {...props}>
      <div className={cx(styles.icon, classes?.icon)} />
    </IconButton>
  );
};

export default forwardRef(RecordButton);
