import { useEffect, useState } from 'react';

const useStopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [previousDuration, setPreviousDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const updateTime = (time: number) => {
      setLastTime(time);
      requestId = requestAnimationFrame(updateTime);
    };

    let requestId = requestAnimationFrame(updateTime);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [isRunning]);

  return {
    elapsed: previousDuration + lastTime - startTime,

    start: () => {
      const now = performance.now();
      setStartTime(now);
      setLastTime(now);
      setIsRunning(true);
    },

    stop: () => {
      setIsRunning(false);
      setPreviousDuration(previousDuration + performance.now() - startTime);
      setStartTime(0);
      setLastTime(0);
    },
  };
};

export default useStopWatch;
