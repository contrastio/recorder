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
      padding: '10px 24px',
    },
    startIcon: {
      marginRight: 10,
      ['& > *:nth-of-type(1)']: {
        fontSize: 16,
      },
    },
    outlined: {
      borderColor: 'var(--mui-palette-divider)',
    },
  },
};

export default button;
