import Header from "./Header";
import Toolbar from "./Toolbar";
import VideoStreams from "./VideoStreams";
import { StreamsProvider } from "./contexts/streams";

import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <StreamsProvider>
          <VideoStreams />
          <Toolbar />
        </StreamsProvider>
      </main>
    </>
  );
}

export default App;
