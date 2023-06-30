import cx from 'classnames';

import Footer from 'components/Footer';
import PiPWindow from 'components/PiPWindow';
import { useStreams } from 'contexts/streams';
import useVideoSource from 'hooks/useUpdateVideoSource';

import styles from './App.module.css';

const App = () => {
  const { screenshareStream } = useStreams();
  const updateScreenshareSource = useVideoSource(screenshareStream);

  return (
    <div
      className={cx(styles.root, {
        [styles.placeholder]: !screenshareStream,
      })}
    >
      {/* <VideoStreams /> */}
      <main className={styles.main}>
        {screenshareStream && (
          <video
            ref={updateScreenshareSource}
            className={styles.video}
            autoPlay
            playsInline
            muted
            controls={false}
          />
        )}
      </main>
      <Footer />
      <PiPWindow />
    </div>
  );
};

export default App;
