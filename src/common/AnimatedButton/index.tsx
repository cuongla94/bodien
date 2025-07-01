import React from 'react';
import { StyledAnimatedButton } from './styles'; // or wherever the styled component is

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  baseColor?: string;
  hoverColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  baseColor,
  hoverColor,
  textColor,
  borderColor,
  hoverTextColor,
  disabled,
  ...rest
}) => {
  return (
    <StyledAnimatedButton
      baseColor={baseColor}
      hoverColor={hoverColor}
      textColor={textColor}
      borderColor={borderColor}
      hoverTextColor={hoverTextColor}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledAnimatedButton>
  );
};
