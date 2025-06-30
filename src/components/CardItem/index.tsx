import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';
import Link from 'next/link';
import { urlFor } from 'apis';
import { BlogCardItem } from 'config/blog-config';
import { Button } from 'react-bootstrap';
import { AnalyticsItem, AnalyticsWrapper, CardWrapper, CategoryStyled, ControlsWrapper, DescriptionStyled, FooterStyled, ImageStyled, PlaceholderImage, ReadMoreLink, ThemedButton, TitleStyled } from './styles';

// Types
interface CardItemProps {
  type?: 'blog' | 'news';
  title: string;
  description?: string;
  author?: string;
  source?: string;
  url?: string;
  image?: any;
  date: string;
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

// Component
export const CardItem: React.FC<CardItemProps> = ({
  type = 'blog',
  title,
  description,
  author,
  source,
  url,
  image,
  date,
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
  const formattedDate = new Date(date).toLocaleString();

  return (
    <CardWrapper>
      {hasImage ? (
        <ImageStyled
          src={isNews ? image : urlFor(image).height(180).url()}
          alt={title}
        />
      ) : (
        <PlaceholderImage>No Image Available</PlaceholderImage>
      )}

      <TitleStyled as={isNews ? 'a' : 'div'} href={isNews ? url : undefined} target="_blank" rel="noopener noreferrer">
        {title}
      </TitleStyled>

      {isNews && description && <DescriptionStyled>{description}</DescriptionStyled>}

      {!isNews && displayCategory && (
        <CategoryStyled style={{ color: theme?.subTextColor || '#9CA3AF' }}>
          - {displayCategory}
        </CategoryStyled>
      )}

      {!isNews && isAdmin && (numOfViews || numOfShares) && (
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

      <FooterStyled>
        {isNews && (
          <>
            {author && <span>By {author} • </span>}
            {source && <span>{source} • </span>}
          </>
        )}
        {formattedDate}
      </FooterStyled>

      {isNews && url ? (
        <ReadMoreLink href={url} target="_blank" rel="noopener noreferrer">
          Read more →
        </ReadMoreLink>
      ) : (
        <ControlsWrapper>
          {!isAdmin && url && (
            <Link href={url} passHref>
              <ThemedButton
                size="sm"
                bg={theme?.primaryColor}
                text={theme?.buttonText}
              >
                {BlogCardItem.readMoreText}
              </ThemedButton>
            </Link>
          )}
          {isAdmin && (
            <>
              <ThemedButton size="sm" onClick={onEdit} bg={theme?.primaryColor} text={theme?.buttonText}>
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
              <Button size="sm" variant="secondary" onClick={onToggleHidden}>
                {hidden ? 'Unhide' : 'Hide'}
              </Button>
            </>
          )}
        </ControlsWrapper>
      )}
    </CardWrapper>
  );
};
