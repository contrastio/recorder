import cx from 'classnames';

import Footer from 'components/Footer';
import PiPWindow from 'components/PiPWindow';
import VideoStreams from 'components/VideoStreams';
import { useStreams } from 'contexts/streams';

import styles from './App.module.css';

const App = () => {
  const { screenshareStream } = useStreams();

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
