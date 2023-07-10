import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import button from './button';
import colorSchemes from './colorSchemes';
import iconButton from './iconButton';
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
    MuiIconButton: iconButton,
    MuiInputBase: inputBase,
    MuiOutlinedInput: outlinedInput,
    MuiSelect: select,
    MuiMenuItem: menuItem,
    MuiTooltip: tooltip,
  },
});

export default theme;
