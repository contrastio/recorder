import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles';

import Footer from 'components/Footer';
import PiPWindow from 'components/PiPWindow';
import { PictureInPictureProvider } from 'contexts/pictureInPicture';
import { RecordingProvider } from 'contexts/recording';
import { StreamsProvider } from 'contexts/streams';

import theme from './theme';

import styles from './App.module.css';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <StreamsProvider>
          <RecordingProvider>
            <PictureInPictureProvider>
              {/* <VideoStreams /> */}
              <main className={styles.main} />
              <Footer />
              <PiPWindow />
            </PictureInPictureProvider>
          </RecordingProvider>
        </StreamsProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default App;
