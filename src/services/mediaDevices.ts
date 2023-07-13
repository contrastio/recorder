export const requestPermissions = async () => {
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

const isAuthorized = (device: MediaDeviceInfo) =>
  device.deviceId && device.label;

const getAuthorizedCameras = (devices: MediaDeviceInfo[]) => {
  return devices.filter(
    (device) => device.kind === 'videoinput' && isAuthorized(device),
  );
};

const getAuthorizedMicrophones = (devices: MediaDeviceInfo[]) => {
  return devices.filter(
    (device) => device.kind === 'audioinput' && isAuthorized(device),
  );
};

export const getAuthorizedDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return {
    cameras: getAuthorizedCameras(devices),
    microphones: getAuthorizedMicrophones(devices),
  };
};

export const getDeviceId = (
  devices: MediaDeviceInfo[],
  preferredDeviceId: string,
) => {
  if (devices.some((device) => device.deviceId === preferredDeviceId)) {
    return preferredDeviceId;
  } else if (devices.some((device) => device.deviceId === 'default')) {
    return 'default';
  } else if (devices.length) {
    return devices[0].deviceId;
  } else {
    return '';
  }
};

export const getCameraStream = (deviceId: string): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({
    video: {
      deviceId,
      aspectRatio: 16 / 9,
      width: 3840,
      height: 2160,
    },
    audio: false,
  });
};

export const getMicrophoneStream = (deviceId: string): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({
    audio: { deviceId },
    video: false,
  });
};
