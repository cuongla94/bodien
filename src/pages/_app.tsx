import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeProvider } from 'theme';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;
library.add(
  faSun,
  faMoon,
  faList,
  faBorderAll,
  faSortNumericDown,
  faSortNumericUp
);

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-toggle/style.css';
import 'styles/index.scss';
import 'react-quill/dist/quill.snow.css';

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
