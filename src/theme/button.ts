import { Components, CssVarsTheme } from '@mui/material/styles';

const button: Components<CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    size: 'large',
    disableRipple: true,
  },
  styleOverrides: {
    root: { borderRadius: 100 },
    sizeLarge: { padding: '11px 24px' },
    startIcon: { marginRight: 10 },
  },
};

export default button;
