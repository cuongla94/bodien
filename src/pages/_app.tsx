// pages/_app.tsx
import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeProvider as CustomThemeProvider, GlobalStyles } from 'theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-toggle/style.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-resizable/css/styles.css';

function MyAppWrapper({ Component, pageProps }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme?.type) {
      document.body.style.background = theme.background;
      document.body.style.color = theme.mainTextColor;
    }
  }, [theme]);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </StyledThemeProvider>
  );
}

export default function App(props) {
  return (
    <CustomThemeProvider>
      <MyAppWrapper {...props} />
    </CustomThemeProvider>
  );
}
