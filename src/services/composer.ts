export const composeStreams = (
  cameraStream: MediaStream | null,
  screenshareStream: MediaStream
): MediaStream => {
  const cameraVideoTrack = cameraStream?.getVideoTracks()[0];
  const cameraAudioTrack = cameraStream?.getAudioTracks()[0];
  const screenshareVideoTrack = screenshareStream.getVideoTracks()[0];

  const cameraProcessor = cameraVideoTrack
    ? new MediaStreamTrackProcessor({ track: cameraVideoTrack })
    : null;

  const screenshareProcessor = new MediaStreamTrackProcessor({
    track: screenshareVideoTrack,
  });
  const screenshareReader = screenshareProcessor.readable.getReader();
  const recordingGenerator = new MediaStreamTrackGenerator({ kind: "video" });

  if (cameraProcessor) {
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    const transformer = new TransformStream({
      async transform(cameraFrame: VideoFrame, controller) {
        const { value: screenshareFrame } = await screenshareReader.read();
        if (screenshareFrame) {
          canvas.width = screenshareFrame.displayWidth;
          canvas.height = screenshareFrame.displayHeight;
          ctx.drawImage(screenshareFrame, 0, 0);
          screenshareFrame.close();
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
