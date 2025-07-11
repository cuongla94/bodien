// components/Layout/styles.ts
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.mainTextColor};
  transition:
    background 0.2s ease-out,
    color 0.2s ease-out;
`;

export const PageWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem 0;
  margin-top: auto;

  p {
    margin-bottom: 0;
    color: ${({ theme }) => theme.subTextColor};
    text-align: center;
  }
`;
