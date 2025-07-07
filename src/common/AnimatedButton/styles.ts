import styled from 'styled-components';

interface StyledAnimatedButtonProps {
  baseColor?: string;
  hoverColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  fontSize?: keyof import('theme/types').AppTheme['fontSize'];
  disabled?: boolean;
}

export const StyledAnimatedButton = styled.button<StyledAnimatedButtonProps>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ baseColor, theme }) => baseColor || theme.buttonBg};
  color: ${({ textColor, theme }) => textColor || theme.buttonText};
  border: 2px solid ${({ borderColor, theme }) => borderColor || theme.buttonBg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize || 'base']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fontFamily.button};
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background-color: ${({ hoverColor, theme }) => hoverColor || theme.buttonHoverBg};
    transition: left 0.4s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    color: ${({ hoverTextColor, theme }) => hoverTextColor || theme.buttonText};
    border-color: ${({ borderColor, theme }) => borderColor || theme.buttonHoverBg};
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${theme.disabledBg};
    color: ${theme.disabledText};
    border-color: ${theme.disabledBg};

    &::before {
      display: none;
    }
  `}
`;
