import Link from 'next/link';
import { BlogBreadcrumb } from '../BlogBreadcrum';
import {
  BlogHeaderWrapper,
  BlogTitle,
  BlogDate,
  CoverImageWrapper,
  CoverImage,
} from './styles';

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
  breadcrumbHome = '/',
  breadcrumbHomeLabel = 'Home',
}: BlogHeaderProps) {
  return (
    <BlogHeaderWrapper>
      {showBreadcrumb && (
        <BlogBreadcrumb
          title={title}
          subtitle={subtitle}
          homeHref={breadcrumbHome}
          homeLabel={breadcrumbHomeLabel}
        />
      )}

      <BlogTitle>{title}</BlogTitle>
      <BlogDate>Added on {date}</BlogDate>

      {coverImage && (
        <CoverImageWrapper>
          <CoverImage
            src={coverImage}
            alt={`Cover image for ${title}`}
            onError={e => {
              e.currentTarget.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className =
                'cover-image-placeholder bg-light p-4 rounded text-center';
              placeholder.innerHTML =
                '<p class="text-muted mb-0">Cover image not available</p>';
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
          />
        </CoverImageWrapper>
      )}
    </BlogHeaderWrapper>
  );
}
