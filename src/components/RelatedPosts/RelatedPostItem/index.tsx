import React from 'react';
import Image from 'next/image';
import { getFormattedDate } from 'utils/dates';
import { IBlogPost } from 'types/blog';
import { urlFor } from 'apis';

import {
  RelatedPostItemContent,
  RelatedPostItemDateText,
  RelatedPostItemThumbnail,
  RelatedPostItemTitle,
  RelatedPostItemWrapper,
  RelatedPostItemNoImage,
} from './styles';

interface RelatedPostItemProps {
  post: IBlogPost;
  onClick?: (post: IBlogPost) => void;
}

export const RelatedPostItem: React.FC<RelatedPostItemProps> = ({ post, onClick }) => {
  const hasImage = !!post.coverImage?.asset;
  const imageUrl = hasImage ? urlFor(post.coverImage).width(80).height(80).url() : '';

  const formattedDate = getFormattedDate(post);

  return (
    <RelatedPostItemWrapper onClick={() => onClick?.(post)}>
      {hasImage ? (
        <RelatedPostItemThumbnail>
          <Image
            src={imageUrl}
            alt={post.title}
            width={80}
            height={80}
            style={{ objectFit: 'cover', borderRadius: 6 }}
          />
        </RelatedPostItemThumbnail>
      ) : (
        <RelatedPostItemNoImage>No Image</RelatedPostItemNoImage>
      )}

      <RelatedPostItemContent>
        <RelatedPostItemTitle>{post.title}</RelatedPostItemTitle>
        <RelatedPostItemDateText>{formattedDate}</RelatedPostItemDateText>
      </RelatedPostItemContent>
    </RelatedPostItemWrapper>
  );
};
