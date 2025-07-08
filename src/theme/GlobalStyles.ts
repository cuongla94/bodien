// theme/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
