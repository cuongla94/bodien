import Link from 'next/link';
import { BlogBreadcrumb } from '../BlogBreadcrum';

interface BlogHeaderProps {
  title: string;
  subtitle?: string;
  coverImage?: string | null;
  date: string;
  showBreadcrumb?: boolean;
  breadcrumbHome?: string;
  breadcrumbHomeLabel?: string;
}

export function BlogHeader({
  title,
  subtitle,
  coverImage,
  date,
  showBreadcrumb = true,
  breadcrumbHome = "/",
  breadcrumbHomeLabel = "Home",
}: BlogHeaderProps) {
  return (
    <div className="blog-detail-header">
      {showBreadcrumb && (
        <BlogBreadcrumb
          title={title}
          subtitle={subtitle}
          homeHref={breadcrumbHome}
          homeLabel={breadcrumbHomeLabel}
        />
      )}

      <h1 className="fw-bold blog-detail-header-title mb-1">{title}</h1>
      <div className="text-end text-muted mb-3" style={{ fontSize: '0.9rem' }}>
        Created on {date}
      </div>

      {coverImage && (
        <div className="blog-cover-image mb-4">
          <img
            className="img-fluid rounded"
            src={coverImage}
            alt={`Cover image for ${title}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'cover-image-placeholder bg-light p-4 rounded text-center';
              placeholder.innerHTML =
                '<p class="text-muted mb-0">Cover image not available</p>';
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
          />
        </div>
      )}
    </div>
  );
}
