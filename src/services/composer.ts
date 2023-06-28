export const composeStreams = (
  cameraStream: MediaStream | null,
  screenshareStream: MediaStream
): MediaStream => {
  const cameraVideoTrack = cameraStream?.getVideoTracks()[0];
  const cameraAudioTrack = cameraStream?.getAudioTracks()[0];
  const screenshareVideoTrack = screenshareStream.getVideoTracks()[0];

  const screenshareProcessor = new MediaStreamTrackProcessor({
    track: screenshareVideoTrack,
  });
  const recordingGenerator = new MediaStreamTrackGenerator({ kind: 'video' });

  if (cameraVideoTrack) {
    const cameraProcessor = new MediaStreamTrackProcessor({
      track: cameraVideoTrack,
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
          // the next frame, which could come way later when the screen share
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

        const cameraWidth = cameraFrame.displayWidth;
        const cameraHeight = cameraFrame.displayHeight;

        ctx.beginPath();
        ctx.arc(canvas.width - 150, canvas.height - 150, 100, 0, 2 * Math.PI);
        ctx.clip();

        ctx.drawImage(
          cameraFrame,
          (cameraWidth - cameraHeight) / 2,
          0,
          cameraHeight,
          cameraHeight,
          canvas.width - 250,
          canvas.height - 250,
          200,
          200
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
  if (cameraAudioTrack) {
    recordingStream.addTrack(cameraAudioTrack);
  }

  return recordingStream;
};
