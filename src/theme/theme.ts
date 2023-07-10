import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import button from './button';
import colorSchemes from './colorSchemes';
import { inputBase, outlinedInput } from './input';
import select, { menuItem } from './select';
import tooltip from './tooltip';
import typography, { fontFaces } from './typography';

const theme = extendTheme({
  colorSchemes,
  typography,
  components: {
    MuiCssBaseline: { styleOverrides: fontFaces },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: button,
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
        },
        colorError: {
          ':hover': {
            backgroundColor: `color-mix(
              in srgb,
              var(--mui-palette-background-paper),
              var(--mui-palette-action-active) calc(var(--mui-palette-action-hoverOpacity) * 100%)
            )`,
          },
        },
      },
    },
    MuiInputBase: inputBase,
    MuiOutlinedInput: outlinedInput,
    MuiSelect: select,
    MuiMenuItem: menuItem,
    MuiTooltip: tooltip,
  },
});

export default theme;
