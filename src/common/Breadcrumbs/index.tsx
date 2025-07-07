// components/common/Breadcrumbs.tsx
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb" className={`d-flex align-items-center ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="d-flex align-items-center text-muted small">
            {!isLast && item.href ? (
              <Link
                href={item.href}
                className="text-decoration-none me-1"
                style={{ color: '#ffffff', fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ) : (
              <span className="fw-bold" style={{ color: '#ffffff' }}>
                {item.label}
              </span>
            )}

            {!isLast && (
              <FiChevronRight className="mx-2" style={{ color: '#ffffff' }} size={14} />
            )}
          </span>
        );
      })}
    </nav>
  );
};
