import { createContext } from 'react';

export const themes = {
  light: {
    type: 'light',
    mainTextColor: '#2b2c38',
    subTextColor: '#adb5bd',
    background: '#f4f7f9',
  },
  dark: {
    type: 'dark',
    mainTextColor: '#dcdcdc',
    subTextColor: '#adb5bd',
    background: '#2b2c38',
  },
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});