import { CssVarsThemeOptions } from '@mui/material/styles';

const common = {
  primary: {
    main: '#FF5065',
  },
  secondary: {
    main: '#DEFFFD',
  },
};

const colorSchemes: CssVarsThemeOptions['colorSchemes'] = {
  dark: {
    palette: {
      ...common,
      divider: 'rgba(255, 255, 255, 0.08)',
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
