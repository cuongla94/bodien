import React, { useEffect, useState } from 'react';
import { ToastWrapper, ProgressBar } from './styles';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const triggerExit = setTimeout(() => setIsExiting(true), duration - 400);
    const autoRemove = setTimeout(() => onClose(), duration);

    return () => {
      clearTimeout(triggerExit);
      clearTimeout(autoRemove);
    };
  }, [duration, onClose]);

  return (
    <ToastWrapper type={type} isExiting={isExiting}>
      {message}
      <ProgressBar duration={duration} />
    </ToastWrapper>
  );
};
