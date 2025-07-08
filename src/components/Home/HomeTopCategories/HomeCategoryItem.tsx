// src/components/HomeTopCategories/HomeCategoryItem.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import {
  CategoryCard,
  CategoryImage,
  CategoryName
} from './styles';

interface Props {
  name: string;
  count: number;
  image?: string;
}

export const HomeCategoryItem: React.FC<Props> = ({ name, count, image }) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <CategoryCard>
      <CategoryImage>
        {!image || hasImageError ? (
          <div className="no-image">No Image Found</div>
        ) : (
          <Image
            src={image}
            alt={name}
            width={240}
            height={160}
            onError={() => setHasImageError(true)}
            style={{
              borderRadius: '12px',
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </CategoryImage>

      <CategoryName>
        {name}
      </CategoryName>
    </CategoryCard>
  );
};
