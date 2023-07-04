import { useCallback, useEffect, useRef, useState } from 'react';

import { useStreams } from 'contexts/streams';
import * as devicePreference from 'services/preference/device';

const requestDevicesPermissions = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    mediaStream.getTracks().forEach((track) => track.stop());
  } catch (error) {
    console.warn('Devices permissions denied', error);
  }
};

export type MediaDevices = {
  cameras: MediaDeviceInfo[];
  cameraId: string;
  microphones: MediaDeviceInfo[];
  microphoneId: string;
  setPreferredCamera: (deviceId: string) => Promise<void>;
  setPreferredMicrophone: (deviceId: string) => Promise<void>;
};

const useMediaDevices = (): MediaDevices => {
  const {
    cameraStream,
    microphoneStream,
    setCameraStream,
    setMicrophoneStream,
  } = useStreams();

  // TODO Move into a context to ensure they are requested only once
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [microphoneId, setMicrophoneId] = useState('');

  const cameraStreamRef = useRef(cameraStream);
  const microphoneStreamRef = useRef(microphoneStream);
  const cameraIdRef = useRef(cameraId);
  const microphoneIdRef = useRef(microphoneId);

  cameraStreamRef.current = cameraStream;
  microphoneStreamRef.current = microphoneStream;
  cameraIdRef.current = cameraId;
  microphoneIdRef.current = microphoneId;

  const getCamera = useCallback(
    async (deviceId: string) => {
      if (deviceId === cameraIdRef.current) {
        return;
      }
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      if (deviceId) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId,
            aspectRatio: 16 / 9,
            width: 3840,
            height: 2160,
          },
          audio: false,
        });
        setCameraStream(cameraStream);
      }
    },
    [setCameraStream]
  );

  const getMicrophone = useCallback(
    async (deviceId: string) => {
      if (deviceId === microphoneIdRef.current) {
        return;
      }
      microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
      if (deviceId) {
        const microphoneStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId },
          video: false,
        });
        setMicrophoneStream(microphoneStream);
      }
    },
    [setMicrophoneStream]
  );

  useEffect(() => {
    const updateDevice = (
      devices: MediaDeviceInfo[],
      preferredDeviceId: string,
      setDeviceId: React.Dispatch<React.SetStateAction<string>>
    ) => {
      let deviceId = '';
      if (devices.some((device) => device.deviceId === preferredDeviceId)) {
        deviceId = preferredDeviceId;
      } else if (devices.some((device) => device.deviceId === 'default')) {
        deviceId = 'default';
      } else if (devices.length) {
        deviceId = devices[0].deviceId;
      }
      setDeviceId(deviceId);
      return deviceId;
    };

    const updateDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(
        (device) =>
          device.kind === 'videoinput' && device.deviceId && device.label
      );
      const microphones = devices.filter(
        (device) =>
          device.kind === 'audioinput' && device.deviceId && device.label
      );
      const preference = devicePreference.get();
      setCameras(cameras);
      setMicrophones(microphones);
      const cameraId = updateDevice(cameras, preference.cameraId, setCameraId);
      const microphoneId = updateDevice(
        microphones,
        preference.microphoneId,
        setMicrophoneId
      );
      await Promise.all([getCamera(cameraId), getMicrophone(microphoneId)]);
    };

    (async () => {
      await requestDevicesPermissions();
      await updateDevices();
    })();

    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, [getCamera, getMicrophone]);

  const setPreferredCamera = async (deviceId: string) => {
    devicePreference.update({ cameraId: deviceId });
    setCameraId(deviceId);
    await getCamera(deviceId);
  };

  const setPreferredMicrophone = async (deviceId: string) => {
    devicePreference.update({ microphoneId: deviceId });
    setMicrophoneId(deviceId);
    await getMicrophone(deviceId);
  };

  return {
    cameras,
    cameraId,
    microphones,
    microphoneId,
    setPreferredCamera,
    setPreferredMicrophone,
  };
};

export default useMediaDevices;
