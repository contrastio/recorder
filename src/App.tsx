import cx from 'classnames';
import { useEffect } from 'react';

import Footer from 'components/Footer';
import PiPWindow from 'components/PiPWindow';
import VideoStreams from 'components/VideoStreams';
import { useStreams } from 'contexts/streams';

import styles from './App.module.css';

const App = () => {
  const { screenshareStream, setCameraStream } = useStreams();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(setCameraStream);
  }, [setCameraStream]);

  return (
    <div
      className={cx(styles.root, {
        [styles.placeholder]: !screenshareStream,
      })}
    >
      <main className={styles.main}>
        <VideoStreams />
      </main>
      <Footer />
      <PiPWindow />
    </div>
  );
};

export default App;
