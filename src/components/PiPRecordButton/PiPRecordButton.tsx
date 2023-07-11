import cx from 'classnames';
import { forwardRef } from 'react';

import RecordButton, { RecordButtonProps } from 'components/RecordButton';

import styles from './PiPRecordButton.module.css';

type PiPRecordButtonProps = RecordButtonProps;

const PiPRecordButton = (
  { className, ...props }: PiPRecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <RecordButton className={cx(styles.root, className)} ref={ref} {...props} />
  );
};

export default forwardRef(PiPRecordButton);
