import React from 'react';
import { StyledSpinner } from './styles';

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export const Spinner = ({ size = 24, color = '#666', className }: SpinnerProps) => {
  return (
    <StyledSpinner
      role="status"
      size={size}
      color={color}
      className={className}
    >
      <span className="visually-hidden">Loading...</span>
    </StyledSpinner>
  );
};
