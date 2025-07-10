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
  const props = {
    $uppercase: uppercase,
    $isBlack: isBlack,
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <AnimatedStyledLink {...props}>{children}</AnimatedStyledLink>
      </a>
    );
  }

  return (
    <Link href={href}>
      <AnimatedStyledLink {...props}>{children}</AnimatedStyledLink>
    </Link>
  );
};
