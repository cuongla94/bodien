import styled from 'styled-components';

interface StyledAnimatedButtonProps {
  baseColor?: string;
  hoverColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  disabled?: boolean;
}

export const StyledAnimatedButton = styled.button<StyledAnimatedButtonProps>`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${({ baseColor }) => baseColor || 'black'};
  color: ${({ textColor }) => textColor || 'white'};
  border: 2px solid ${({ borderColor }) => borderColor || 'black'};
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background-color: ${({ hoverColor }) => hoverColor || 'white'};
    transition: left 0.4s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    color: ${({ hoverTextColor }) => hoverTextColor || 'black'};
    border-color: ${({ borderColor }) => borderColor || 'black'};
  }

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;

    &::before {
      display: none;
    }
  `}
`;
