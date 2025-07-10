// src/components/HomeTopCategories/HomeCategoryItem.tsx
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  HomeCategoryItemCard,
  HomeCategoryItemImageWrapper,
  HomeCategoryItemImage,
  HomeCategoryItemOverlayText,
  HomeCategoryItemBottomBorder,
} from './styles';

interface Props {
  name: string;
  count: number;
  image: string | StaticImageData;
}

export const HomeCategoryItem: React.FC<Props> = ({ name, image }) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <HomeCategoryItemCard>
      <HomeCategoryItemImageWrapper>
        {!image || hasImageError ? (
          <div className="no-image">No Image Found</div>
        ) : (
          <HomeCategoryItemImage
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setHasImageError(true)}
          />
        )}
        <HomeCategoryItemOverlayText>{name}</HomeCategoryItemOverlayText>
        <HomeCategoryItemBottomBorder />
      </HomeCategoryItemImageWrapper>
    </HomeCategoryItemCard>
  );
};
