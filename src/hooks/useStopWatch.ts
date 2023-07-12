import { useEffect, useRef, useState } from 'react';

const useStopWatch = () => {
  const [previousDuration, setPreviousDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const requestIdRef = useRef(0);

  const updateTime = (time: number) => {
    setLastTime(time);
    requestIdRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return {
    elapsed: previousDuration + lastTime - startTime,

    start: () => {
      const now = performance.now();
      setStartTime(now);
      setLastTime(now);
      requestIdRef.current = requestAnimationFrame(updateTime);
    },

    stop: () => {
      cancelAnimationFrame(requestIdRef.current);
      setPreviousDuration(previousDuration + performance.now() - startTime);
      setStartTime(0);
      setLastTime(0);
    },
  };
};

export default useStopWatch;
