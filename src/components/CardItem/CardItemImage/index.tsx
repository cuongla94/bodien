import React from 'react';
import { urlFor } from 'apis';
import { CardImageWrapper, StyledCardImage, PlaceholderText } from './styles';

interface CardItemImageProps {
  image?: any;
}

export const CardItemImage: React.FC<CardItemImageProps> = ({ image }) => {
  const hasImage = !!image;

  return (
    <CardImageWrapper>
      {hasImage ? (
        <StyledCardImage
          src={urlFor(image).height(300).url()}
          alt="Card image"
        />
      ) : (
        <PlaceholderText>No Image Available</PlaceholderText>
      )}
    </CardImageWrapper>
  );
};
