// theme/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Google Font Imports (if not using Head or next/font) */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&family=Roboto:wght@400;500&family=Source+Sans+Pro:wght@300;400&family=Fira+Code&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: ${({ theme }) => theme.fontSizeBase};
    line-height: ${({ theme }) => theme.lineHeightBase};
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily.base};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.mainTextColor};
    transition: background ${({ theme }) => theme.transition.normal},
                color ${({ theme }) => theme.transition.normal};
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.linkHover};
    }
  }

  code {
    font-family: ${({ theme }) => theme.fontFamily.code};
    background: ${({ theme }) => theme.codeBackground};
    color: ${({ theme }) => theme.codeTextColor};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
`;
