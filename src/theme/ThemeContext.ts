// src/theme/ThemeContext.ts
import { createContext } from 'react';
import type { Theme } from '../styled';

export const themes: { light: Theme; dark: Theme } = {
  light: {
    type: 'light',
    fontFamily: "'Inter', sans-serif",
    headingFont: "'Montserrat', sans-serif",
    codeFont: "'Fira Code', monospace",
    fontSizeBase: '16px',
    lineHeightBase: '1.6',
    mainTextColor: '#1F2937',
    subTextColor: '#6B7280',
    background: '#F9FAFB',
    backgroundGradient: undefined,
    cardBackground: '#FFFFFF',
    borderColor: '#E5E7EB',
    highlight: '#F59E0B',
    codeBackground: '#F3F4F6',
    codeTextColor: '#111827',
    buttonBg: '#2563EB',
    buttonText: '#FFFFFF',
    disabledBg: '#E5E7EB',
    disabledText: '#9CA3AF',
    linkColor: '#2563EB',
    linkHover: '#1D4ED8',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
    cardShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
    primaryColor: '#2563EB',
    secondaryColor: '#10B981',
  },
  dark: {
    type: 'dark',
    fontFamily: "'Inter', sans-serif",
    headingFont: "'Montserrat', sans-serif",
    codeFont: "'Fira Code', monospace",
    fontSizeBase: '16px',
    lineHeightBase: '1.6',
    mainTextColor: '#F3F4F6',
    subTextColor: '#9CA3AF',
    background: '#111827',
    backgroundGradient: undefined,
    cardBackground: '#1F2937',
    borderColor: '#374151',
    highlight: '#FBBF24',
    codeBackground: '#1E293B',
    codeTextColor: '#F9FAFB',
    buttonBg: '#3B82F6',
    buttonText: '#FFFFFF',
    disabledBg: '#1F2937',
    disabledText: '#6B7280',
    linkColor: '#3B82F6',
    linkHover: '#60A5FA',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    cardShadow: '0 1px 4px rgba(255, 255, 255, 0.05)',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});
