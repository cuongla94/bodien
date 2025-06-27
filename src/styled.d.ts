// src/styled.d.ts
import 'styled-components';

export interface Theme {
  // Theme type
  type: 'light' | 'dark';

  // Typography
  fontFamily: string;        // Body font
  headingFont: string;       // Headings and titles
  codeFont: string;          // Monospaced font for code
  fontSizeBase: string;
  lineHeightBase: string;
  highlight: string;

  // Text colors
  mainTextColor: string;
  subTextColor: string;
  headingColor?: string;

  // Backgrounds
  background: string;              // Solid fallback background
  backgroundGradient?: string;     // Optional background gradient
  cardBackground: string;
  footerBackground: string;

  // Borders & Shadows
  borderColor: string;
  boxShadow?: string;
  cardShadow?: string;

  // Code blocks
  codeBackground: string;
  codeTextColor: string;

  // Brand colors
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

  // UI State colors
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
  infoColor?: string;

  // Transitions
  transition?: string;
}

// This makes it compatible with styled-components' DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
