import { Components, CssVarsTheme } from '@mui/material/styles';

const select: Components<CssVarsTheme>['MuiSelect'] = {
  styleOverrides: {
    select: {
      height: 48,
      paddingBlock: 0,
    },
    icon: {
      fontSize: 18,
    },
  },
};

export default select;
