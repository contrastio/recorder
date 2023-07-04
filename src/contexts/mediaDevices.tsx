import { createContext, useContext, useEffect, useState } from 'react';

import useCamera from 'hooks/useCamera';
import useMicrophone from 'hooks/useMicrophone';
import {
  getAuthorizedDevices,
  getDeviceId,
  requestPermissions,
} from 'services/mediaDevices';
import * as devicePreference from 'services/preference/device';

type MediaDevicesContextType = {
  cameras: MediaDeviceInfo[];
  cameraId: string;
  microphones: MediaDeviceInfo[];
  microphoneId: string;
  setPreferredCamera: (deviceId: string) => Promise<void>;
  setPreferredMicrophone: (deviceId: string) => Promise<void>;
};

const MediaDevicesContext = createContext<MediaDevicesContextType | undefined>(
  undefined
);

type MediaDevicesProviderProps = {
  children: React.ReactNode;
};

export const MediaDevicesProvider = ({
  children,
}: MediaDevicesProviderProps) => {
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

  return (
    <MediaDevicesContext.Provider
      value={{
        cameras,
        cameraId,
        microphones,
        microphoneId,
        setPreferredCamera,
        setPreferredMicrophone,
      }}
    >
      {children}
    </MediaDevicesContext.Provider>
  );
};

export const useMediaDevices = (): MediaDevicesContextType => {
  const context = useContext(MediaDevicesContext);

  if (context === undefined) {
    throw new Error(
      'useMediaDevices must be used within a MediaDevicesProvider'
    );
  }

  return context;
};
