import React from 'react';
import { SectionHeaderWrapper, SectionHeaderTitle } from './styles';
import { sectionHeaderConfig } from 'config/common-config';
import { AnimatedLink } from 'common/AnimatedLink';

interface SectionHeaderProps {
  title: string;
  href?: string;
  hideLink?: boolean;
  linkLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  href,
  hideLink = true,
  linkLabel,
}) => {
  const label = linkLabel || sectionHeaderConfig.viewAll;

  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitle>{title}</SectionHeaderTitle>
      {!hideLink && href && (
        <AnimatedLink
          href={href}
          uppercase
          isBlack>
            {label}
        </AnimatedLink>
      )}
    </SectionHeaderWrapper>
  );
};
