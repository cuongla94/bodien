import styled, { keyframes, css } from 'styled-components';

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-30%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideDownToClose = keyframes`
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(30%);
    opacity: 0;
  }
`;

export const BlogViewModalSlideWrapper = styled.div<{ animation: 'in' | 'out' }>`
  animation: ${({ animation }) =>
    animation === 'in'
      ? css`${slideInFromLeft} 0.3s ease forwards`
      : css`${slideDownToClose} 0.3s ease forwards`};
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const BlogViewModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlogViewModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  max-width: 1100px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const BlogViewModalCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  background: none;
  border: none;
  color: ${({ theme }) => theme.mainTextColor};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;


export const BlogViewModalFooterButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBg};
  }
`;
