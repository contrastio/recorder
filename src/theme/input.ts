import { Components, CssVarsTheme } from '@mui/material/styles';

export const inputBase: Components<CssVarsTheme>['MuiInputBase'] = {
  styleOverrides: {
    adornedStart: {
      ['& > *:nth-of-type(1)']: {
        fontSize: 20,
      },
    },
  },
};

export const outlinedInput: Components<CssVarsTheme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      borderRadius: 100,
    },
    notchedOutline: {
      borderColor: 'var(--mui-palette-divider)',
      '.MuiOutlinedInput-root:hover &': {
        borderColor: 'var(--mui-palette-text-secondary)',
      },
      '.MuiOutlinedInput-root.Mui-focused &': {
        borderColor: 'var(--mui-palette-text-secondary)',
      },
    },
  },
};
