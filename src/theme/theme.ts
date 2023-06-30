import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import button from './button';
import colorSchemes from './colorSchemes';
import tooltip from './tooltip';
import typography, { fontFaces } from './typography';

const theme = extendTheme({
  colorSchemes,
  typography,
  components: {
    MuiCssBaseline: { styleOverrides: fontFaces },
    MuiButton: button,
    MuiTooltip: tooltip,
  },
});

export default theme;
