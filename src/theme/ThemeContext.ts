import { createContext } from 'react';

export const themes = {
  light: {
    type: 'light',
    mainTextColor: '#1f2937',
    subTextColor: '#6b7280',
    background: '#f9fafb',
    primaryColor: '#2563eb',
    secondaryColor: '#4f46e5',
    cardBackground: '#ffffff',
    borderColor: '#e5e7eb',
    highlight: '#facc15',
    codeBackground: '#f3f4f6',
    buttonBg: '#2563eb',
    buttonText: '#ffffff',
    linkColor: '#2563eb',
    linkHover: '#1d4ed8',
  },
  dark: {
    type: 'dark',
    mainTextColor: '#f3f4f6',
    subTextColor: '#9ca3af',
    background: '#111827',
    primaryColor: '#3b82f6',
    secondaryColor: '#818cf8',
    cardBackground: '#1f2937',
    borderColor: '#374151',
    highlight: '#fbbf24',
    codeBackground: '#1e293b',
    buttonBg: '#3b82f6',
    buttonText: '#ffffff',
    linkColor: '#3b82f6',
    linkHover: '#60a5fa',
  },
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
