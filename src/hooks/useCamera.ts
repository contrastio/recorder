import { useCallback, useRef } from 'react';

import { useLayout } from 'contexts/layout';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useRecording } from 'contexts/recording';
import { useStreams } from 'contexts/streams';
import { getCameraStream } from 'services/mediaDevices';

const useCamera = (deviceId: string, enabled: boolean) => {
  if (!enabled) {
    deviceId = '';
  }

  const { layout } = useLayout();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const { isRecording } = useRecording();
  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const { cameraStream, setCameraStream } = useStreams();

  const cameraStreamRef = useRef(cameraStream);
  cameraStreamRef.current = cameraStream;

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
      if (isRecordingRef.current && layoutRef.current !== 'screenOnly') {
        pipWindowRef.current?.close();
      }
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      if (deviceId) {
        const cameraStream = await getCameraStream(deviceId);
        setCameraStream(cameraStream);
      }
    },
    [setCameraStream],
  );
};

export default useCamera;
