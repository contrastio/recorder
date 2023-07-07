import { Components, CssVarsTheme } from '@mui/material/styles';

const tooltip: Components<CssVarsTheme>['MuiTooltip'] = {
  defaultProps: {
    arrow: true,
  },
  styleOverrides: {
    tooltip: {
      '.MuiTooltip-popper[data-popper-placement*="top"] &': {
        marginBottom: 10,
      },
    },
  },
};

export default tooltip;
