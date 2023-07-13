const localStorageKey = 'devicePreference';

export type DevicePreference = {
  cameraId: string;
  cameraEnabled: boolean;
  microphoneId: string;
  microphoneEnabled: boolean;
};

export const get = (): DevicePreference => {
  const devicePreference = localStorage.getItem(localStorageKey);
  const {
    cameraId = '',
    cameraEnabled = true,
    microphoneId = '',
    microphoneEnabled = true,
  }: DevicePreference = devicePreference ? JSON.parse(devicePreference) : {};

  return { cameraId, cameraEnabled, microphoneId, microphoneEnabled };
};

export const update = (devicePreference: Partial<DevicePreference>) => {
  const previousDevicePreference = get();
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ ...previousDevicePreference, ...devicePreference }),
  );
};
