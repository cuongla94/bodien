// src/theme/types.ts
import 'styled-components';

export interface AppTheme {
  type: 'light';

  fontFamily: {
    base: string;
    heading: string;
    subtext: string;
    button: string;
    code: string;
  };

  fontSizeBase: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };

  responsiveFontSize: {
    heading: { mobile: string; desktop: string };
    subheading: { mobile: string; desktop: string };
    body: { mobile: string; desktop: string };
  };

  lineHeightBase: string;
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
  };

  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    bold: number;
  };

  mainTextColor: string;
  subTextColor: string;
  background: string;
  backgroundGradient?: string;
  cardBackground: string;
  footerBackground: string;
  navbarBackground: string;
  primaryColor: string;
  secondaryColor: string;
  highlight: string;
  borderColor: string;
  boxShadow: string;
  cardShadow: string;

  buttonBg: string;
  buttonText: string;
  buttonHoverBg: string;
  buttonActiveBg: string;
  buttonFocusRing: string;

  disabledBg: string;
  disabledText: string;

  linkColor: string;
  linkHover: string;

  codeBackground: string;
  codeTextColor: string;

  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;

  successColor: string;
  errorColor: string;
  warningColor: string;
  infoColor: string;

  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };

  zIndex: {
    base: number;
    header: number;
    dropdown: number;
    modal: number;
  };

  transition: {
    fast: string;
    normal: string;
    slow: string;
  };

  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}
