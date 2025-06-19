import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeProvider } from 'theme';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-toggle/style.css';
import 'react-quill/dist/quill.snow.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

function MyAppWrapper({ Component, pageProps }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme?.type) {
      document.body.style.background = theme.background;
      document.body.style.color = theme.mainTextColor;
    }
  }, [theme]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <ThemeProvider>
      <MyAppWrapper {...props} />
    </ThemeProvider>
  );
}
