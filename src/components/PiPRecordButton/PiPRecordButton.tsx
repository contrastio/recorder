import cx from 'classnames';
import { forwardRef } from 'react';

import RecordButton, { RecordButtonProps } from 'components/RecordButton';
import { useCountdown } from 'contexts/countdown';

import styles from './PiPRecordButton.module.css';

type PiPRecordButtonProps = RecordButtonProps & {
  onCountdownEnd: () => void;
};

const PiPRecordButton = (
  { className, onCountdownEnd, ...props }: PiPRecordButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const { countingDown, setCountingDown } = useCountdown();

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
          setCountingDown(false);
        }
      }}
    />
  );
};

export default forwardRef(PiPRecordButton);
