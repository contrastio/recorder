import { useStreams } from "./contexts/streams";

import styles from "./Toolbar.module.scss";

const Toolbar = () => {
  const { setCameraStream, setScreenshareStream } = useStreams();

  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setCameraStream(stream);
  };

  const getScreenShare = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    console.log(
      "Screen share settings:",
      stream.getVideoTracks()[0].getSettings()
    );
    setScreenshareStream(stream);
  };

  return (
    <div className={styles.container}>
      <button onClick={getCamera}>Get camera</button>
      <button onClick={getScreenShare}>Share screen</button>
    </div>
  );
};

export default Toolbar;
