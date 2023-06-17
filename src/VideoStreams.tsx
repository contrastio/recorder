import { useEffect, useRef } from "react";

import { useStreams } from "./contexts/streams";

import styles from "./VideoStreams.module.scss";

const VideoStreams = () => {
  const cameraRef = useRef<HTMLVideoElement | null>(null);
  const { streams } = useStreams();

  console.log({ streams });
  useEffect(() => {
    const video = cameraRef.current;

    const cameraStream = streams.find((stream) =>
      stream.getTracks().forEach((track) => {
        console.log("zob");
        console.log({ track });
        return track.kind === "camera";
      })
    );

    if (cameraStream && video) {
      video.srcObject = cameraStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [streams]);

  return (
    <div className={styles.container}>
      <video ref={cameraRef} autoPlay playsInline muted controls={false} />
    </div>
  );
};

export default VideoStreams;
