import React from 'react';
import { urlFor } from 'apis';
import { CardImageWrapper, StyledCardImage, PlaceholderText } from './styles';
import { BlogCardItem } from 'config/blog-config';

interface CardItemImageProps {
  image?: any;
}

export const CardItemImage: React.FC<CardItemImageProps> = ({ image }) => {
  const hasImage = !!image;

  return (
    <CardImageWrapper className={!hasImage ? 'no-image' : ''}>
      {hasImage ? (
        <StyledCardImage
          src={urlFor(image).height(300).url()}
          alt="Card image"
        />
      ) : (
        <PlaceholderText>{BlogCardItem.noImageAvailable}</PlaceholderText>
      )}
    </CardImageWrapper>
  );
};
