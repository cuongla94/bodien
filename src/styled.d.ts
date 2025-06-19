// src/styled.d.ts
import 'styled-components';

export interface Theme {
  type: 'light' | 'dark';
  fontFamily: string;
  fontSizeBase: string;
  lineHeightBase: string;
  mainTextColor: string;
  subTextColor: string;
  background: string;
  cardBackground: string;
  borderColor: string;
  highlight: string;
  codeBackground: string;
  codeTextColor: string;
  primaryColor: string;
  secondaryColor: string;

  // Buttons
  buttonBg: string;
  buttonText: string;
  disabledBg?: string;
  disabledText?: string;

  // Links
  linkColor: string;
  linkHover: string;

  // Typography
  headingColor?: string;

  // Shadow
  boxShadow?: string;
  cardShadow?: string;

  // Status
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
  infoColor?: string;

  // Transitions
  transition?: string;
}

// This makes it compatible with styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
