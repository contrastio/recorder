import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Compose from 'components/Compose';
import { LayoutProvider } from 'contexts/layout';
import { MediaDevicesProvider } from 'contexts/mediaDevices';
import { PictureInPictureProvider } from 'contexts/pictureInPicture';
import { RecordingProvider } from 'contexts/recording';
import { ScreenshareProvider } from 'contexts/screenshare';
import { StreamsProvider } from 'contexts/streams';

import App from './App';
import theme from './theme';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <Compose
          components={[
            LayoutProvider,
            StreamsProvider,
            MediaDevicesProvider,
            RecordingProvider,
            PictureInPictureProvider,
            ScreenshareProvider,
          ]}
        >
          <App />
        </Compose>
      </CssVarsProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
