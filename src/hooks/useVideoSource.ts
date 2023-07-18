import { useCallback, useRef } from 'react';

const useVideoSource = (videoStream: MediaStream | null) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  return useCallback(
    (videoElement: HTMLVideoElement | null) => {
      if (videoElement) {
        videoElement.srcObject = videoStream;
      } else if (videoElementRef.current) {
        videoElementRef.current.srcObject = null;
        videoElementRef.current.load();
      }
      videoElementRef.current = videoElement;
    },
    [videoStream],
  );
};

export default useVideoSource;
