import cx from 'classnames';
import { forwardRef, useState } from 'react';

import RecordButton, { RecordButtonProps } from 'components/RecordButton';

import styles from './PiPRecordButton.module.css';

type PiPRecordButtonProps = RecordButtonProps;

const PiPRecordButton = (
  { className, ...props }: PiPRecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [countingDown] = useState(false);

  return (
    <RecordButton
      className={cx(styles.root, className, {
        [styles.countingDown]: countingDown,
      })}
      classes={{ icon: styles.icon }}
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(PiPRecordButton);
