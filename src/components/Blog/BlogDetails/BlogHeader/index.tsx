import {
  BlogHeaderWrapper,
  BlogTitle,
  BlogDate,
  CoverImageWrapper,
  CoverImage,
} from './styles';
import { Breadcrumbs } from 'common/Breadcrumbs';

interface BlogHeaderProps {
  title: string;
  subtitle?: string;
  coverImage?: string | null;
  date: string;
  updatedAt?: string;
  showBreadcrumb?: boolean;
  breadcrumbHome?: string;
  breadcrumbHomeLabel?: string;
}

export function BlogHeader({
  title,
  subtitle,
  coverImage,
  date,
  updatedAt,
  showBreadcrumb = true,
  breadcrumbHome = '/',
  breadcrumbHomeLabel = 'Home',
}: BlogHeaderProps) {
  return (
    <BlogHeaderWrapper>
      <BlogTitle>{title}</BlogTitle>
      <BlogDate>Published on {date}</BlogDate>

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
