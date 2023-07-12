import cx from 'classnames';

import Footer from 'components/Footer';
import PiPWindow from 'components/PiPWindow';
import VideoStreams from 'components/VideoStreams';
import { useMediaDevices } from 'contexts/mediaDevices';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';
import useKeyboardShorcut from 'hooks/useKeyboardShortcut';

import styles from './App.module.css';

const App = () => {
  const { screenshareStream } = useStreams();
  const { pipWindow } = usePictureInPicture();
  const {
    cameraEnabled,
    microphoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
  } = useMediaDevices();

  useKeyboardShorcut('e', () => setCameraEnabled(!cameraEnabled));
  useKeyboardShorcut('d', () => setMicrophoneEnabled(!microphoneEnabled));

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
      {pipWindow && <PiPWindow pipWindow={pipWindow} />}
    </div>
  );
};

export default App;
