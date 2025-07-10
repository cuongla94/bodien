import React from 'react';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { urlFor } from 'apis';
import {
  CardItemHorizontalWrapper,
  CardItemHorizontalImageWrapper,
  CardItemHorizontalContent,
  CardItemHorizontalTitle,
  CardItemHorizontalMeta,
  CardItemHorizontalCategory,
  CardItemHorizontalReadMore,
} from './styles';

interface CardItemHorizontalProps {
  type?: 'blog' | 'news';
  title: string;
  description?: string;
  category?: { title: string; value: string } | string;
  image?: any;
  publishedDate: string;
  updatedDate?: string;
  url?: string;
  isAdmin?: boolean;
  hidden?: boolean;
  onReadMoreClick?: () => void;
  theme?: any;
  numOfViews?: number;
  numOfShares?: number;
}

export const CardItemHorizontal: React.FC<CardItemHorizontalProps> = ({
  type = 'blog',
  title,
  description,
  category,
  image,
  publishedDate,
  url,
  onReadMoreClick,
}) => {
  const imageUrl = image
    ? type === 'news'
      ? image
      : urlFor(image).width(120).height(120).url()
    : null;

  const displayCategory = typeof category === 'string' ? category : category?.title || '';

  return (
    <CardItemHorizontalWrapper>
      {imageUrl ? (
        <CardItemHorizontalImageWrapper>
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: 'cover', borderRadius: '8px' }}
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

        <CardItemHorizontalMeta>
          <span>
            <FiCalendar style={{ marginRight: '4px' }} />
            {publishedDate}
          </span>

          {onReadMoreClick && (
            <CardItemHorizontalReadMore onClick={onReadMoreClick}>
              Read More
            </CardItemHorizontalReadMore>
          )}
        </CardItemHorizontalMeta>
      </CardItemHorizontalContent>
    </CardItemHorizontalWrapper>
  );
};
