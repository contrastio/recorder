import { Components, CssVarsTheme } from '@mui/material/styles';

const button: Components<CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    size: 'large',
    disableRipple: true,
  },
  styleOverrides: {
    contained: { borderRadius: 100 },
  },
};

export default button;
