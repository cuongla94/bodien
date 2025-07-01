import React from 'react';
import Link from 'next/link';
import { SectionHeaderWrapper, SectionHeaderTitle, SectionHeaderLink } from './styles';
import { sectionHeaderConfig } from 'config/common-config';

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
  linkLabel = sectionHeaderConfig.viewAll;

  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitle>{title}</SectionHeaderTitle>
      {!hideLink && href && (
        <Link href={href} passHref legacyBehavior>
          <SectionHeaderLink>{linkLabel}</SectionHeaderLink>
        </Link>
      )}
    </SectionHeaderWrapper>
  );
};
