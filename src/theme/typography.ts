import { TypographyOptions } from '@mui/material/styles/createTypography';

import GilroyBold from './fonts/Gilroy-Bold.ttf';
import GilroyMedium from './fonts/Gilroy-Medium.ttf';
import GilroyRegular from './fonts/Gilroy-Regular.ttf';
import GilroySemiBold from './fonts/Gilroy-SemiBold.ttf';

const typography: TypographyOptions = {
  fontFamily: 'Gilroy, Arial',
  button: {
    textTransform: undefined,
  },
};

export const fontFaces = `
  @font-face {
    font-family: 'Gilroy';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: local('Gilroy'), local('Gilroy-Regular'), url(${GilroyRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: local('Gilroy'), local('Gilroy-Medium'), url(${GilroyMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: local('Gilroy'), local('Gilroy-SemiBold'), url(${GilroySemiBold}) format('truetype');

    @font-face {
      font-family: 'Gilroy';
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: local('Gilroy'), local('Gilroy-Bold'), url(${GilroyBold}) format('truetype');
  }
`;

export default typography;
