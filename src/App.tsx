import Header from "./Header";
import PiPWindow from "./PiPWindow";
import Toolbar from "./Toolbar";
import VideoStreams from "./VideoStreams";
import { RecordingProvider } from "./contexts/recording";
import { StreamsProvider } from "./contexts/streams";

import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <StreamsProvider>
          <RecordingProvider>
            <VideoStreams />
            <Toolbar />
            <PiPWindow />
          </RecordingProvider>
        </StreamsProvider>
      </main>
    </>
  );
}

export default App;
