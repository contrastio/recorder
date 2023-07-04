import { useCallback } from 'react';

const useVideoSource = (videoStream: MediaStream | null) => {
  return useCallback(
    (videoElement: HTMLVideoElement | null) => {
      if (videoElement) {
        videoElement.srcObject = videoStream;
      }
    },
    [videoStream]
  );
};

export default useVideoSource;
