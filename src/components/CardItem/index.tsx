import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { urlFor } from 'apis';
import { BlogCardItem } from 'config/blog-config';

import {
  CardItemWrapper,
  CardItemImage,
  CardItemPlaceholderImage,
  CardItemContent,
  CardItemCategory,
  CardItemTitle,
  CardItemDescription,
  CardItemFooter,
  CardItemFooterItem,
  CardItemControls,
  CardItemButton,
  CardItemReadMoreLink,
  CardItemFooterStyled,
} from './styles';

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
  onReadMoreClick?: () => void;
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
  image,
  publishedDate,
  category,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleHidden,
  onReadMoreClick,
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

  return (
    <CardItemWrapper>
      {hasImage ? (
        <CardItemImage
          src={isNews ? image : urlFor(image).height(220).url()}
          alt={title}
        />
      ) : (
        <CardItemPlaceholderImage>No Image Available</CardItemPlaceholderImage>
      )}

      <CardItemContent>
        {!isNews && displayCategory && (
          <CardItemCategory>{displayCategory}</CardItemCategory>
        )}

        <CardItemTitle as="div">{title}</CardItemTitle>

        {isNews && description && (
          <CardItemDescription>{description}</CardItemDescription>
        )}

        {showAnalytics && (
          <CardItemFooter>
            {typeof numOfViews === 'number' && (
              <CardItemFooterItem>
                <FiEye /> {numOfViews} {BlogCardItem.blogViewText}
              </CardItemFooterItem>
            )}
            {typeof numOfShares === 'number' && (
              <CardItemFooterItem>
                <FiShare2 /> {numOfShares} {BlogCardItem.blogShareText}
              </CardItemFooterItem>
            )}
          </CardItemFooter>
        )}

        <CardItemFooterStyled>
          <span>{formattedDate}</span>
          {onReadMoreClick && (
            <CardItemReadMoreLink onClick={onReadMoreClick}>
              Read more
            </CardItemReadMoreLink>
          )}
        </CardItemFooterStyled>

        {isAdmin && (
          <CardItemControls>
            <CardItemButton
              size="sm"
              onClick={onEdit}
              bg={theme?.primaryColor}
              text={theme?.buttonText}
            >
              {BlogCardItem.adminEditControlText}
            </CardItemButton>
            <CardItemButton size="sm" variant="danger" onClick={onDelete}>
              {BlogCardItem.adminDeleteControlText}
            </CardItemButton>
            <CardItemButton size="sm" variant="secondary" onClick={onToggleHidden}>
              {hidden ? 'Unhide' : 'Hide'}
            </CardItemButton>
          </CardItemControls>
        )}
      </CardItemContent>
    </CardItemWrapper>
  );
};
