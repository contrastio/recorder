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
  const cameraTrack = cameraStream?.getVideoTracks()[0];
  const microphoneTrack = microphoneStream?.getAudioTracks()[0];
  const screenshareTrack = screenshareStream.getVideoTracks()[0];

  const screenshareProcessor = new MediaStreamTrackProcessor({
    track: screenshareTrack,
  });
  const recordingGenerator = new MediaStreamTrackGenerator({ kind: 'video' });

  if (cameraTrack) {
    const cameraProcessor = new MediaStreamTrackProcessor({
      track: cameraTrack,
    });
    const screenshareReader = screenshareProcessor.readable.getReader();

    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas API not supported');
    }

    let latestScreenshareFrame: VideoFrame | undefined;

    const transformer = new TransformStream({
      async transform(cameraFrame: VideoFrame, controller) {
        if (latestScreenshareFrame) {
          // Awaiting the read operation would block the recording until
          // the next frame, which could come way later when the screenshare
          // is fully static
          screenshareReader.read().then(({ value: screenshareFrame }) => {
            latestScreenshareFrame?.close();
            latestScreenshareFrame = screenshareFrame;
          });
        } else {
          // Waits for the 1st frame to initialize the canvas dimensions
          const { value: screenshareFrame } = await screenshareReader.read();
          latestScreenshareFrame = screenshareFrame;
        }
        if (latestScreenshareFrame) {
          canvas.width = latestScreenshareFrame.displayWidth;
          canvas.height = latestScreenshareFrame.displayHeight;
          ctx.drawImage(latestScreenshareFrame, 0, 0);
        }

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
          cameraFrame,
          (cameraFrame.displayWidth - cameraFrame.displayHeight) / 2,
          0,
          cameraFrame.displayHeight,
          cameraFrame.displayHeight,
          canvas.width - CAMERA_WIDTH - CAMERA_MARGIN_RIGHT,
          canvas.height - CAMERA_HEIGHT - CAMERA_MARGIN_BOTTOM,
          CAMERA_WIDTH,
          CAMERA_HEIGHT
        );

        ctx.restore();

        const newFrame = new VideoFrame(canvas, {
          timestamp: cameraFrame.timestamp,
        });
        cameraFrame.close();
        controller.enqueue(newFrame);
      },
    });

    cameraProcessor.readable
      .pipeThrough(transformer)
      .pipeTo(recordingGenerator.writable);
  } else {
    screenshareProcessor.readable.pipeTo(recordingGenerator.writable);
  }

  const recordingStream = new MediaStream([recordingGenerator]);
  if (microphoneTrack) {
    recordingStream.addTrack(microphoneTrack);
  }

  return recordingStream;
};
