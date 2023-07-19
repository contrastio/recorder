import { Components, CssVarsTheme } from '@mui/material/styles';

const button: Components<CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'outlined',
    size: 'large',
    color: 'inherit',
  },
  styleOverrides: {
    root: {
      borderRadius: 100,
    },
    sizeLarge: {
      fontSize: 16,
      paddingBlock: 9,
    },
    startIcon: {
      ['& > *:nth-of-type(1)']: {
        fontSize: 20,
      },
    },
    outlined: {
      borderColor: 'var(--mui-palette-divider)',
    },
  },
};

export default button;
