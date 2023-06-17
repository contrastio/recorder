import Header from "./Header";
import Toolbar from "./Toolbar";
import VideoStreams from "./VideoStreams";
import { StreamsProvider } from "./contexts/streams";

import styles from "./App.module.scss";

function App() {
  return (
    <main className={styles.container}>
      <Header />
      <main>
        <StreamsProvider>
          <VideoStreams />
          <Toolbar />
        </StreamsProvider>
      </main>
    </main>
  );
}

export default App;
