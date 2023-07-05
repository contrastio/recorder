export const CAMERA_WIDTH = 240;
export const CAMERA_HEIGHT = 240;
export const CAMERA_BORDER_RADIUS = 8;
export const CAMERA_MARGIN_RIGHT = 40;
export const CAMERA_MARGIN_BOTTOM = 40;

export const composeStreams = (
  cameraStream: MediaStream | null,
  microphoneStream: MediaStream | null,
  screenshareStream: MediaStream
): MediaStream => {
  const microphoneTrack = microphoneStream?.getAudioTracks()[0];

  const screenshareVideo = document.createElement('video');
  screenshareVideo.style.position = 'fixed';
  screenshareVideo.style.visibility = 'hidden';
  screenshareVideo.autoplay = true;
  screenshareVideo.muted = true;
  document.body.appendChild(screenshareVideo);

  screenshareVideo.srcObject = screenshareStream;

  const cameraVideo = document.createElement('video');
  cameraVideo.style.position = 'fixed';
  cameraVideo.style.visibility = 'hidden';
  cameraVideo.autoplay = true;
  cameraVideo.muted = true;
  document.body.appendChild(cameraVideo);

  cameraVideo.srcObject = cameraStream;

  const canvas = document.createElement('canvas');
  canvas.width = screenshareVideo.videoWidth || 1920;
  canvas.height = screenshareVideo.videoHeight || 1080;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas API not supported');
  }

  const render = () => {
    canvas.width = screenshareVideo.videoWidth || 1920;
    canvas.height = screenshareVideo.videoHeight || 1080;

    ctx.drawImage(screenshareVideo, 0, 0);

    ctx.beginPath();
    ctx.roundRect(
      canvas.width - CAMERA_WIDTH - CAMERA_MARGIN_RIGHT,
      canvas.height - CAMERA_HEIGHT - CAMERA_MARGIN_BOTTOM,
      CAMERA_WIDTH,
      CAMERA_HEIGHT,
      CAMERA_BORDER_RADIUS
    );
    ctx.clip();

    ctx.drawImage(
      cameraVideo,
      (cameraVideo.videoWidth - cameraVideo.videoHeight) / 2,
      0,
      cameraVideo.videoHeight,
      cameraVideo.videoHeight,
      canvas.width - CAMERA_WIDTH - CAMERA_MARGIN_RIGHT,
      canvas.height - CAMERA_HEIGHT - CAMERA_MARGIN_BOTTOM,
      CAMERA_WIDTH,
      CAMERA_HEIGHT
    );

    ctx.restore();

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);

  const recordingStream = canvas.captureStream();
  if (microphoneTrack) {
    recordingStream.addTrack(microphoneTrack);
  }

  return recordingStream;
};
