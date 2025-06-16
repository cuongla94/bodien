import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';

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
  breadcrumbHomeLabel = "Home"
}: BlogHeaderProps) {
  
  return (
    <div className="blog-detail-header">
      {showBreadcrumb && (
        <div className="blog-breadcrumb mb-3">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href={breadcrumbHome} className="text-decoration-none">
                {breadcrumbHomeLabel}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <span className="fw-semibold">{title}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      )}

      <div className="blog-meta mb-3">
        <p className="lead mb-0">
          {date}
        </p>
      </div>

      <h1 className="font-weight-bold blog-detail-header-title mb-2">{title}</h1>
      {/* {subtitle && (
        <h2 className="blog-detail-header-subtitle mb-3 text-muted">{subtitle}</h2>
      )} */}
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
              placeholder.innerHTML = '<p class="text-muted mb-0">Cover image not available</p>';
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
          />
        </div>
      )}
    </div>
  );
}