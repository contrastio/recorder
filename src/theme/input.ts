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
  },
};
