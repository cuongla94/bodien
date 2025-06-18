import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';
import styles from './styles.module.scss';

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
  homeLabel = "Home",
  homeHref = "/",
}) => {
  return (
    <div className={`${styles.blogBreadcrumb} mb-5`}>
        <Breadcrumb>
            {showHome && (
            <Breadcrumb.Item>
                <Link href={homeHref} className={`${styles.breadcrumbText} text-decoration-none`}>
                {homeLabel}
                </Link>
            </Breadcrumb.Item>
            )}
            <Breadcrumb.Item active>
            <span className={`fw-semibold ${styles.breadcrumbText}`}>{title}</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    </div>
  );
};
