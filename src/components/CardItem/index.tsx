import React, { useState } from 'react';
import Image from 'next/image';
import { FiEye, FiShare2, FiCalendar } from 'react-icons/fi';
import { urlFor } from 'apis';
import { BlogCardItem } from 'config/blog-config';
import { truncateText } from 'utils/text';

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
  CardItemHorizontalWrapper,
  CardItemHorizontalImageWrapper,
  CardItemHorizontalContent,
  CardItemHorizontalCategory,
  CardItemHorizontalTitle,
  CardItemHorizontalMeta,
  CardItemHorizontalReadMore,
  CardItemHorizontalDescription,
} from './styles';
import { AppLinks } from 'config/navigation-config';

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
  mode?: 'vertical' | 'horizontal';
  slug?: string
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

export const CardItem: React.FC<CardItemProps> = ({
  type = 'blog',
  title,
  slug,
  description,
  image,
  publishedDate,
  category,
  isAdmin,
  onEdit,
  onDelete,
  onToggleHidden,
  onReadMoreClick,
  hidden,
  theme,
  numOfViews,
  numOfShares,
  mode = 'vertical',
}) => {
  const isNews = type === 'news';
  const hasImage = !!image;

  const imageUrl = hasImage ? (isNews ? image : urlFor(image).height(220).url()) : null;
  const horizontalImageUrl = hasImage
    ? isNews
      ? image
      : urlFor(image).width(120).height(120).url()
    : null;

  const displayCategory = typeof category === 'string' ? category : category?.title || '';
  const formattedDate = new Date(publishedDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const baseUrl = getBaseUrl();
  const fullUrl = slug ? `${baseUrl}${AppLinks.blogs.link}?post=${slug}` : '';

const [copied, setCopied] = useState(false);

const handleCopyLink = () => {
  if (!fullUrl) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = fullUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};


  // =======================
  // Horizontal Mode Layout
  // =======================
  if (mode === 'horizontal') {
    return (
      <CardItemHorizontalWrapper>
        {horizontalImageUrl ? (
          <CardItemHorizontalImageWrapper>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <Image
                src={horizontalImageUrl}
                alt={title}
                fill
                style={{ objectFit: 'cover', borderRadius: '6px' }}
                sizes="100px"
              />
            </div>
          </CardItemHorizontalImageWrapper>
        ) : (
          <CardItemHorizontalImageWrapper>No Image</CardItemHorizontalImageWrapper>
        )}

        <CardItemHorizontalContent>
          {displayCategory && (
            <CardItemHorizontalCategory>{displayCategory}</CardItemHorizontalCategory>
          )}

          <CardItemHorizontalTitle>{title}</CardItemHorizontalTitle>

          {isNews && description && (
            <CardItemDescription>{truncateText(description, 150)}</CardItemDescription>
          )}

          <CardItemHorizontalMeta>
            <span>
              <FiCalendar style={{ marginRight: '4px' }} />
              {formattedDate}
            </span>

            {onReadMoreClick && !isAdmin && (
              <CardItemHorizontalReadMore onClick={onReadMoreClick}>
                Read More
              </CardItemHorizontalReadMore>
            )}
          </CardItemHorizontalMeta>
        </CardItemHorizontalContent>
      </CardItemHorizontalWrapper>
    );
  }

  // =====================
  // Vertical Mode Layout
  // =====================
  return (
    <CardItemWrapper>
      {hasImage ? (
        <CardItemImage src={imageUrl} alt={title} />
      ) : (
        <CardItemPlaceholderImage>No Image Available</CardItemPlaceholderImage>
      )}

      <CardItemContent>
        {!isNews && displayCategory && (
          <CardItemCategory>{displayCategory}</CardItemCategory>
        )}

        <CardItemTitle as="div">{title}</CardItemTitle>

        {isNews && description && (
          <CardItemHorizontalDescription>
            {truncateText(description, 300)}
          </CardItemHorizontalDescription>
        )}

        {isAdmin && (
          <CardItemFooter>
            <CardItemFooterItem>
              <FiEye /> {numOfViews ?? 0} {BlogCardItem.blogViewText}
            </CardItemFooterItem>
            <CardItemFooterItem>
              <FiShare2 /> {numOfShares ?? 0} {BlogCardItem.blogShareText}
            </CardItemFooterItem>
          </CardItemFooter>
        )}

        <CardItemFooterStyled>
          <span> {isAdmin && `Created on`} {formattedDate}</span>
          {onReadMoreClick && !isAdmin && (
            <CardItemReadMoreLink onClick={onReadMoreClick}>
              Read more
            </CardItemReadMoreLink>
          )}
        </CardItemFooterStyled>

        {isAdmin && (
          <CardItemControls >
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
<CardItemButton
  size="sm"
  onClick={handleCopyLink}
  style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
>
  {copied ? 'Copied!' : 'Copy Link'}
</CardItemButton>
          </CardItemControls>
        )}
      </CardItemContent>
    </CardItemWrapper>
  );
};
