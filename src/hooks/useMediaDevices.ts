import { useEffect, useState } from 'react';

import {
  getAuthorizedDevices,
  getDeviceId,
  requestPermissions,
} from 'services/mediaDevices';
import * as devicePreference from 'services/preference/device';

import useCamera from './useCamera';
import useMicrophone from './useMicrophone';

export type MediaDevices = {
  cameras: MediaDeviceInfo[];
  cameraId: string;
  microphones: MediaDeviceInfo[];
  microphoneId: string;
  setPreferredCamera: (deviceId: string) => Promise<void>;
  setPreferredMicrophone: (deviceId: string) => Promise<void>;
};

const useMediaDevices = (): MediaDevices => {
  // TODO Move into a context to ensure they are requested only once
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [microphoneId, setMicrophoneId] = useState('');

  const getCamera = useCamera(cameraId);
  const getMicrophone = useMicrophone(microphoneId);

  useEffect(() => {
    const updateDevices = async () => {
      const { cameras, microphones } = await getAuthorizedDevices();

      const preference = devicePreference.get();
      const cameraId = getDeviceId(cameras, preference.cameraId);
      const microphoneId = getDeviceId(microphones, preference.microphoneId);

      setCameras(cameras);
      setMicrophones(microphones);
      setCameraId(cameraId);
      setMicrophoneId(microphoneId);

      await Promise.all([getCamera(cameraId), getMicrophone(microphoneId)]);
    };

    requestPermissions().then(updateDevices);

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
