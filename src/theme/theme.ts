import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import button from './button';
import tooltip from './tooltip';

const theme = extendTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: undefined,
    },
  },
  components: {
    MuiButton: button,
    MuiTooltip: tooltip,
  },
});

export default theme;
