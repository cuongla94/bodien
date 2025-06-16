import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BlogBreadcrumbProps {
  title: string;
  subtitle?: string;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  className?: string;
}

export const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({
  title,
  subtitle,
  showHome = true,
  homeLabel = "Home",
  homeHref = "/",
  className = ""
}) => {
  return (
    <div className={`blog-breadcrumb ${className}`}>
      <Breadcrumb>
        {showHome && (
          <Breadcrumb.Item>
            <Link href={homeHref} className="text-decoration-none">
              {homeLabel}
            </Link>
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>
          <span className="fw-semibold">{title}</span>
          {subtitle && (
            <small className="text-muted d-block">{subtitle}</small>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};