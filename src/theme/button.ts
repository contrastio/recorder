import { Components, CssVarsTheme } from '@mui/material/styles';

const button: Components<CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'outlined',
    color: 'inherit',
    disableRipple: true,
  },
  styleOverrides: {
    outlined: { borderRadius: 100 },
    outlinedInherit: { borderColor: 'var(--mui-palette-divider)' },
  },
};

export default button;
