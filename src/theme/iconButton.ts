import { Components, CssVarsTheme } from '@mui/material/styles';

const iconButton: Components<CssVarsTheme>['MuiIconButton'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'var(--mui-palette-background-paper)',
      ':hover': {
        backgroundColor: `color-mix(
          in srgb,
          var(--mui-palette-background-paper),
          var(--mui-palette-action-active) calc(var(--mui-palette-action-hoverOpacity) * 100%)
        )`,
      },
    },
  },
};

export default iconButton;
