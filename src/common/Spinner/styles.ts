import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const StyledSpinner = styled.div<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  border-color: ${({ color }) => `${color} transparent ${color} transparent`};
  animation: ${spin} 1s linear infinite;
`;
