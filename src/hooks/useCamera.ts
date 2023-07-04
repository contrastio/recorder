import { useCallback, useRef } from 'react';

import { useStreams } from 'contexts/streams';
import { getCameraStream } from 'services/mediaDevices';

const useCamera = (deviceId: string) => {
  const { cameraStream, setCameraStream } = useStreams();

  const cameraStreamRef = useRef(cameraStream);
  cameraStreamRef.current = cameraStream;

  const deviceIdRef = useRef(deviceId);
  deviceIdRef.current = deviceId;

  return useCallback(
    async (deviceId: string) => {
      if (deviceId === deviceIdRef.current) {
        return;
      }
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      if (deviceId) {
        const cameraStream = await getCameraStream(deviceId);
        setCameraStream(cameraStream);
      }
    },
    [setCameraStream]
  );
};

export default useCamera;
