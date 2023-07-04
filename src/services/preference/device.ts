const localStorageKey = 'devicePreference';

export type DevicePreference = {
  cameraId: string;
  microphoneId: string;
};

export const get = (): DevicePreference => {
  const devicePreference = localStorage.getItem(localStorageKey);
  const { cameraId = '', microphoneId = '' }: DevicePreference =
    devicePreference ? JSON.parse(devicePreference) : {};

  return { cameraId, microphoneId };
};

export const update = (devicePreference: Partial<DevicePreference>) => {
  const previousDevicePreference = get();
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ ...previousDevicePreference, ...devicePreference })
  );
};
