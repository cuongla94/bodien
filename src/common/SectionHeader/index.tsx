import React from 'react';
import Link from 'next/link';
import {
  SectionHeaderWrapper,
  SectionHeaderTitle,
  SectionHeaderTitleRow,
  SectionHeaderNavControls,
  SectionHeaderStyledLink,
} from './styles';
import { sectionHeaderConfig } from 'config/common-config';

interface SectionHeaderProps {
  title: string;
  href?: string;
  hideLink?: boolean;
  linkLabel?: string;
  isNews?: boolean;
  children?: React.ReactNode; // for nav controls
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  href,
  hideLink = false,
  linkLabel,
  isNews = false,
  children,
}) => {
  const label = linkLabel || sectionHeaderConfig.viewAll;

  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitleRow>
        <SectionHeaderTitle>{title}</SectionHeaderTitle>
        {!hideLink && href && (
          <span style={{ marginLeft: '1rem' }}>
            (
            <Link href={href} passHref legacyBehavior>
              <SectionHeaderStyledLink>{label}</SectionHeaderStyledLink>
            </Link>
            )
          </span>
        )}
      </SectionHeaderTitleRow>
      {isNews && <SectionHeaderNavControls>{children}</SectionHeaderNavControls>}
    </SectionHeaderWrapper>
  );
};
