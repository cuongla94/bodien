// styles.ts
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &.light,
  &.dark {
    transition:
      background 0.2s ease-out,
      color 0.2s ease-out;
  }
`;

export const PageWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const Footer = styled.footer`
  padding: 1rem 0;
  margin-top: auto;
`;

export const FooterText = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.875rem;
`;
