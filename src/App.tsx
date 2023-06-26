import Header from "./Header";
import PiPWindow from "./PiPWindow";
import Toolbar from "./Toolbar";
import VideoStreams from "./VideoStreams";
import { RecordingProvider } from "./contexts/recording";
import { StreamsProvider } from "./contexts/streams";

import styles from "./App.module.scss";
import { PictureInPictureProvider } from "./contexts/pictureInPicture";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <StreamsProvider>
          <RecordingProvider>
            <PictureInPictureProvider>
              <VideoStreams />
              <Toolbar />
              <PiPWindow />
            </PictureInPictureProvider>
          </RecordingProvider>
        </StreamsProvider>
      </main>
    </>
  );
}

export default App;
