import { ColorSystemOptions, CssVarsThemeOptions } from '@mui/material/styles';

const common: ColorSystemOptions['palette'] = {
  primary: {
    main: '#FF5065',
  },
  secondary: {
    main: '#DEFFFD',
  },
  Tooltip: {
    bg: '#1C1D1E',
  },
};

const colorSchemes: CssVarsThemeOptions['colorSchemes'] = {
  dark: {
    palette: {
      ...common,
      divider: 'rgba(255, 255, 255, 0.15)',
    },
  },
  light: {
    palette: {
      ...common,
      divider: 'rgba(46, 41, 71, 0.09)',
    },
  },
};

export default colorSchemes;
