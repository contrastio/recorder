import cx from 'classnames';
import { forwardRef, useState } from 'react';

import RecordButton, { RecordButtonProps } from 'components/RecordButton';

import styles from './PiPRecordButton.module.css';

type PiPRecordButtonProps = RecordButtonProps & {
  onCountdownEnd: () => void;
};

const PiPRecordButton = (
  { className, onCountdownEnd, ...props }: PiPRecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [countingDown, setCountingDown] = useState(false);

  return (
    <RecordButton
      className={cx(styles.root, className, {
        [styles.countingDown]: countingDown,
      })}
      classes={{ icon: styles.icon }}
      ref={ref}
      {...props}
      onClick={() => setCountingDown(true)}
      onAnimationEnd={(event) => {
        if (event.animationName === styles.countdown) {
          onCountdownEnd();
        }
      }}
    />
  );
};

export default forwardRef(PiPRecordButton);
