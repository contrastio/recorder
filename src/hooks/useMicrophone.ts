import { useCallback, useRef } from 'react';

import { useStreams } from 'contexts/streams';
import { getMicrophoneStream } from 'services/mediaDevices';

const useMicrophone = (deviceId: string, enabled: boolean) => {
  if (!enabled) {
    deviceId = '';
  }

  const { microphoneStream, setMicrophoneStream } = useStreams();

  const microphoneStreamRef = useRef(microphoneStream);
  microphoneStreamRef.current = microphoneStream;

  const deviceIdRef = useRef(deviceId);
  deviceIdRef.current = deviceId;

  return useCallback(
    async (deviceId: string, enabled: boolean) => {
      if (!enabled) {
        deviceId = '';
      }
      if (deviceId === deviceIdRef.current) {
        return;
      }
      microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
      if (deviceId) {
        const microphoneStream = await getMicrophoneStream(deviceId);
        setMicrophoneStream(microphoneStream);
      }
    },
    [setMicrophoneStream]
  );
};

export default useMicrophone;
