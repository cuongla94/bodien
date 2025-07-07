import React from 'react';
import { Breadcrumbs } from 'common/Breadcrumbs';
import { PageTitleWrapper, TitleHeading, TitleSubheading } from './styles';
import { Container } from 'react-bootstrap';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  breadcrumbs,
  className
}) => {
  return (
    <PageTitleWrapper className={className}>
      <Container>
        <Breadcrumbs items={breadcrumbs} className="mb-3" />
        <TitleHeading>{title}</TitleHeading>
        {subtitle && <TitleSubheading>{subtitle}</TitleSubheading>}
      </Container>
    </PageTitleWrapper>
  );
};
