// src/components/Toast/styles.ts
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;


const shrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

export const ToastWrapper = styled.div<{ type: string; isExiting: boolean }>`
  min-width: 300px;
  max-width: 400px;
  margin-bottom: 12px;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  font-size: 0.95rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.successColor || '#10B981';
      case 'error':
        return theme.errorColor || '#EF4444';
      case 'warning':
        return theme.warningColor || '#F59E0B';
      case 'info':
      default:
        return theme.infoColor || '#3B82F6';
    }
  }};
  animation: ${({ isExiting }) =>
    isExiting
      ? css`${slideOut} 0.4s ease forwards`
      : css`${slideIn} 0.4s ease forwards`};
  transition: all 0.3s ease;
`;

export const ProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  animation: ${shrink} ${({ duration }) => duration}ms linear forwards;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
