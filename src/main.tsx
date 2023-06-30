import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Compose from 'components/Compose';
import { PictureInPictureProvider } from 'contexts/pictureInPicture';
import { RecordingProvider } from 'contexts/recording';
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
            StreamsProvider,
            RecordingProvider,
            PictureInPictureProvider,
          ]}
        >
          <App />
        </Compose>
      </CssVarsProvider>
    </StyledEngineProvider>
  </StrictMode>
);
