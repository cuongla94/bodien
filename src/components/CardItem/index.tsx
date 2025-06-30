import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { urlFor } from 'apis';
import { BlogCardItem } from 'config/blog-config';
import { Button } from 'react-bootstrap';
import {
  AnalyticsItem,
  AnalyticsWrapper,
  CardWrapper,
  CategoryStyled,
  ControlsWrapper,
  DescriptionStyled,
  FooterStyled,
  ImageStyled,
  PlaceholderImage,
  ReadMoreLink,
  ThemedButton,
  TitleStyled,
} from './styles';
import Link from 'next/link';

interface CardItemProps {
  type?: 'blog' | 'news';
  title: string;
  description?: string;
  author?: string;
  source?: string;
  url?: string;
  image?: any;
  publishedDate: string;
  updatedDate?: string;
  category?: { title: string; value: string } | string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
  hidden?: boolean;
  theme?: any;
  tags?: string[];
  numOfViews?: number;
  numOfShares?: number;
}

export const CardItem: React.FC<CardItemProps> = ({
  type = 'blog',
  title,
  description,
  author,
  source,
  url,
  image,
  publishedDate,
  category,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleHidden,
  hidden,
  theme,
  numOfViews,
  numOfShares,
}) => {
  const isNews = type === 'news';
  const hasImage = !!image;
  const displayCategory = typeof category === 'string' ? category : category?.title || '';
  const formattedDate = new Date(publishedDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const showAnalytics = isAdmin && (numOfViews || numOfShares);
  const showFooter = isNews || publishedDate;

  return (
    <CardWrapper>
      {/* Image or Placeholder */}
      {hasImage ? (
        <ImageStyled
          src={isNews ? image : urlFor(image).height(180).url()}
          alt={title}
        />
      ) : (
        <PlaceholderImage>No Image Available</PlaceholderImage>
      )}

      {/* Category (for blog only) */}
      {!isNews && displayCategory && (
        <CategoryStyled style={{ color: theme?.subTextColor || '#9CA3AF' }}>
          - {displayCategory}
        </CategoryStyled>
      )}

      <Link href={url} passHref legacyBehavior>
        <TitleStyled as="a" target="_blank" rel="noopener noreferrer">
          {title}
        </TitleStyled>
      </Link>

      {/* News description */}
      {isNews && description && <DescriptionStyled>{description}</DescriptionStyled>}

      {/* Analytics for blog admin */}
      {!isNews && showAnalytics && (
        <AnalyticsWrapper>
          {typeof numOfViews === 'number' && (
            <AnalyticsItem>
              <FiEye /> {numOfViews} {BlogCardItem.blogViewText}{numOfViews !== 1 ? 's' : ''}
            </AnalyticsItem>
          )}
          {typeof numOfShares === 'number' && (
            <AnalyticsItem>
              <FiShare2 /> {numOfShares} {BlogCardItem.blogShareText}{numOfShares !== 1 ? 's' : ''}
            </AnalyticsItem>
          )}
        </AnalyticsWrapper>
      )}

      {/* Footer */}
      {showFooter && (
        <FooterStyled className={isNews ? '' : 'd-flex justify-content-between align-items-end'}>
          <div>
            {isNews && (
              <>
                {author && <span>By {author} • </span>}
                {source && <span>{source} • </span>}
              </>
            )}
            {formattedDate}
          </div>

          {/* Blog read more link inside footer */}
          {!isNews && url && (
            <Link href={url} passHref legacyBehavior>
              <ReadMoreLink as="a" target="_blank" rel="noopener noreferrer">
                Read more
              </ReadMoreLink>
            </Link>
          )}
        </FooterStyled>
      )}

      {/* News title (only outside footer) */}
      {isNews && url && (
        <Link href={url} passHref legacyBehavior>
              <ReadMoreLink as="a" target="_blank" rel="noopener noreferrer">
                Read more
              </ReadMoreLink>
        </Link>
      )}

      {/* Admin Controls */}
      {isAdmin && (
        <ControlsWrapper>
          <ThemedButton
            size="sm"
            onClick={onEdit}
            bg={theme?.primaryColor}
            text={theme?.buttonText}
          >
            {BlogCardItem.adminEditControlText}
          </ThemedButton>

          <Button
            size="sm"
            variant="danger"
            onClick={onDelete}
            style={{ color: '#fff', border: 'none' }}
          >
            {BlogCardItem.adminDeleteControlText}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={onToggleHidden}
          >
            {hidden ? 'Unhide' : 'Hide'}
          </Button>
        </ControlsWrapper>
      )}
    </CardWrapper>
  );
};
