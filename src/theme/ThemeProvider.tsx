import { ReactNode, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const themeAPI = useThemeProvider();

  // Ensure memoized object for context value
  const contextValue = useMemo(
    () => ({
      theme: themeAPI.theme,
      toggleTheme: themeAPI.toggleTheme,
    }),
    [themeAPI.theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={themeAPI.theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
