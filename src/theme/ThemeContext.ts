// src/theme/ThemeContext.ts
import { createContext } from 'react';
import { AppTheme } from './types';

export const themes: { light: AppTheme } = {
  light: {
    type: 'light',

    // -----------------------------------
    // Fonts & Typography
    // -----------------------------------
    fontFamily: {
      base: "'Inter', sans-serif",                   // Body text
      heading: "'Montserrat', sans-serif",          // Titles
      subtext: "'Source Sans Pro', sans-serif",     // Captions / small labels
      button: "'Roboto', sans-serif",               // Buttons / UI
      code: "'Fira Code', monospace",               // Code blocks
    },

    fontSizeBase: '16px',
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '30px',
      '3xl': '36px',
    },

    responsiveFontSize: {
      heading: {
        mobile: '24px',
        desktop: '30px',
      },
      subheading: {
        mobile: '18px',
        desktop: '24px',
      },
      body: {
        mobile: '14px',
        desktop: '16px',
      },
    },

    lineHeightBase: '1.6',
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },

    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },

    // -----------------------------------
    // Colors
    // -----------------------------------
    mainTextColor: '#1F2937',
    subTextColor: '#6B7280',

    background: '#ffffff',
    backgroundGradient: undefined,
    cardBackground: '#FFFFFF',
    footerBackground: '#F3F4F6',
    navbarBackground: 'rgba(255, 255, 255, 0.9)',

    primaryColor: '#1976D2',
    secondaryColor: '#D4AF37',
    highlight: '#D4AF37',

    borderColor: '#E5E7EB',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
    cardShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',

    // -----------------------------------
    // Buttons & Links
    // -----------------------------------
    buttonBg: '#1976D2',
    buttonText: '#FFFFFF',
    buttonHoverBg: '#1565C0',
    buttonActiveBg: '#0D47A1',
    buttonFocusRing: '0 0 0 3px rgba(25, 118, 210, 0.4)',

    disabledBg: '#E5E7EB',
    disabledText: '#9CA3AF',

    linkColor: '#1976D2',
    linkHover: '#125EA9',

    // -----------------------------------
    // Code Blocks
    // -----------------------------------
    codeBackground: '#F3F4F6',
    codeTextColor: '#1F2937',

    // -----------------------------------
    // Form Inputs
    // -----------------------------------
    inputBg: '#FFFFFF',
    inputBorder: '#D1D5DB',
    inputText: '#1F2937',
    inputPlaceholder: '#9CA3AF',
    inputFocusBorder: '#1976D2',

    // -----------------------------------
    // Status Colors
    // -----------------------------------
    successColor: '#16A34A',
    errorColor: '#DC2626',
    warningColor: '#F59E0B',
    infoColor: '#0288D1',

    // -----------------------------------
    // Spacing & Radius Tokens
    // -----------------------------------
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },

    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
    },

    // -----------------------------------
    // Z-Index Layers
    // -----------------------------------
    zIndex: {
      base: 1,
      header: 800,
      dropdown: 900,
      modal: 1000,
    },

    // -----------------------------------
    // Transitions
    // -----------------------------------
    transition: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },

    // -----------------------------------
    // Breakpoints
    // -----------------------------------
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
};

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});
