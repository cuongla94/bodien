import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';
import { BreadcrumbWrapper, BreadcrumbText } from './styles';

interface BlogBreadcrumbProps {
  title: string;
  subtitle?: string;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
}

export const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({
  title,
  subtitle,
  showHome = true,
  homeLabel = 'Home',
  homeHref = '/',
}) => {
  return (
    <BreadcrumbWrapper className="mb-5">
      <Breadcrumb>
        {showHome && (
          <Breadcrumb.Item>
            <Link href={homeHref} passHref legacyBehavior>
              <BreadcrumbText as="a">{homeLabel}</BreadcrumbText>
            </Link>
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>
          <BreadcrumbText as="span" className="fw-semibold">
            {title}
          </BreadcrumbText>
        </Breadcrumb.Item>
      </Breadcrumb>
    </BreadcrumbWrapper>
  );
};
