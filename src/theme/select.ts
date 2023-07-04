import { Components, CssVarsTheme } from '@mui/material/styles';

export const menuItem: Components<CssVarsTheme>['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      '&.Mui-selected': {
        '&.Mui-selected': {
          backgroundColor: 'var(--mui-palette-action-selected)',
          '&:hover': {
            backgroundColor:
              'rgba(var(--mui-palette-action-selectedChannel) / calc(var(--mui-palette-action-selectedOpacity) + var(--mui-palette-action-hoverOpacity)))',
          },
        },
      },
    },
  },
};

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
