// components/AnimatedLink.tsx
import styled from 'styled-components';

interface AnimatedStyledLinkProps {
  uppercase?: boolean;
  isBlack?: boolean;
}

export const AnimatedStyledLink = styled.a<AnimatedStyledLinkProps>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ isBlack, theme }) => (isBlack ? '#000' : theme.linkColor)};
  position: relative;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  text-decoration: none !important; /* ✅ Prevent default underline */
  cursor: pointer;
  padding-bottom: 2px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.linkColor};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ isBlack, theme }) =>
      isBlack ? theme.subTextColor : theme.linkHover};

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: none;
    text-decoration: none;
  }
`;
