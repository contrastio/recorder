import { Components, CssVarsTheme } from '@mui/material/styles';

const iconButton: Components<CssVarsTheme>['MuiIconButton'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'var(--mui-palette-background-paper)',
      border: '1px solid var(--mui-palette-divider);',
      padding: 7,
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
