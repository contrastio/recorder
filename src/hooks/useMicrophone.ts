import { useCallback, useRef } from 'react';

import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import { getMicrophoneStream } from 'services/mediaDevices';

const useMicrophone = (deviceId: string, enabled: boolean) => {
  if (!enabled) {
    deviceId = '';
  }

  const { isRecording } = useRecording();
  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

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
      if (isRecordingRef.current) {
        pipWindowRef.current?.close();
      }
      microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
      if (deviceId) {
        const microphoneStream = await getMicrophoneStream(deviceId);
        setMicrophoneStream(microphoneStream);
      }
    },
    [setMicrophoneStream],
  );
};

export default useMicrophone;
