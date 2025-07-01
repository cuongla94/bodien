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

export const SlideWrapper = styled.div<{ animation: 'in' | 'out' }>`
  animation: ${({ animation }) =>
    animation === 'in'
      ? css`${slideInFromLeft} 0.3s ease forwards`
      : css`${slideDownToClose} 0.3s ease forwards`};
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const BlogModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlogModalContent = styled.div`
  background: #fff;
  max-width: 1100px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const BlogModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const BlogModalFooterButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;
