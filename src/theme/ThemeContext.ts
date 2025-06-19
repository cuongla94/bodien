// src/theme/ThemeContext.ts
import { createContext } from 'react';
import type { Theme } from '../styled';

export const themes: { light: Theme; dark: Theme } = {
  light: {
    type: 'light',
    fontFamily: "'Inter', sans-serif",
    fontSizeBase: '16px',
    lineHeightBase: '1.6',
    mainTextColor: '#1f2937',
    subTextColor: '#6b7280',
    background: '#f9fafb',
    cardBackground: '#ffffff',
    borderColor: '#e5e7eb',
    highlight: '#facc15',
    codeBackground: '#f3f4f6',
    codeTextColor: '#111827',
    buttonBg: '#2563eb',
    buttonText: '#ffffff',
    linkColor: '#2563eb',
    linkHover: '#1d4ed8',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    cardShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    primaryColor: '#2563eb', // ✅ added
    secondaryColor: '#4f46e5', // ✅ added
  },
  dark: {
    type: 'dark',
    fontFamily: "'Inter', sans-serif",
    fontSizeBase: '16px',
    lineHeightBase: '1.6',
    mainTextColor: '#f3f4f6',
    subTextColor: '#9ca3af',
    background: '#111827',
    cardBackground: '#1f2937',
    borderColor: '#374151',
    highlight: '#fbbf24',
    codeBackground: '#1e293b',
    codeTextColor: '#f9fafb',
    buttonBg: '#3b82f6',
    buttonText: '#ffffff',
    linkColor: '#3b82f6',
    linkHover: '#60a5fa',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    cardShadow: '0 1px 4px rgba(255, 255, 255, 0.05)',
    primaryColor: '#3b82f6', // ✅ added
    secondaryColor: '#818cf8', // ✅ added
  },
};

// 👇 Define the context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 👇 Export the ThemeContext
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});
