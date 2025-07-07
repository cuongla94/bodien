// components/AnimatedLink.tsx
import React from 'react';
import Link from 'next/link';
import { AnimatedStyledLink } from './styles';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  uppercase?: boolean;
  external?: boolean;
  isBlack?: boolean;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  uppercase = false,
  external = false,
  isBlack = false,
}) => {
  if (external) {
    return (
      <AnimatedStyledLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        uppercase={uppercase}
        isBlack={isBlack}
      >
        {children}
      </AnimatedStyledLink>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <AnimatedStyledLink uppercase={uppercase} isBlack={isBlack}>
        {children}
      </AnimatedStyledLink>
    </Link>
  );
};
