import { useStreams } from "./contexts/streams";

import styles from "./Toolbar.module.scss";

const Toolbar = () => {
  const { setCameraStream } = useStreams();

  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setCameraStream(stream);
  };

  return (
    <div className={styles.container}>
      <button onClick={getCamera}>Get camera</button>
      <button>Share screen</button>
    </div>
  );
};

export default Toolbar;
