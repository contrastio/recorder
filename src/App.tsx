import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles';

import Header from 'components/Header';
import PiPWindow from 'components/PiPWindow';
import Toolbar from 'components/Toolbar';
import VideoStreams from 'components/VideoStreams';
import { PictureInPictureProvider } from 'contexts/pictureInPicture';
import { RecordingProvider } from 'contexts/recording';
import { StreamsProvider } from 'contexts/streams';

import styles from './App.module.css';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
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
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default App;
