import { useEffect, useState, useMemo } from 'react';
import { themes } from 'theme/ThemeContext';

const THEME_KEY = 'bodien-theme';

export const useThemeProvider = () => {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') setTheme(themes.light);
  }, []);

  const toggleTheme = () => {
    const newTheme = themes.light;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme.type);
  };

  return useMemo(() => ({ theme, toggleTheme }), [theme]);
};
