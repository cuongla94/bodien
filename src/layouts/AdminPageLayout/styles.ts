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
