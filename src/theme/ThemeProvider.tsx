import { ThemeContext } from './ThemeContext';
import { useThemeProvider } from 'hooks/useThemeProvider';

export const ThemeProvider = ({ children }) => {
  const themeAPI = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeAPI}>
      {children}
    </ThemeContext.Provider>
  );
};
