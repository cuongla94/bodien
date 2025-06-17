import React from 'react';
import { Card } from 'react-bootstrap';
import { urlFor } from 'apis';

interface CardItemImageProps {
  image?: any;
}

export const CardItemImage: React.FC<CardItemImageProps> = ({ image }) => {
  const hasImage = !!image;

  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        backgroundColor: !hasImage ? '#f8f9fa' : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: '0.25rem',
        borderTopRightRadius: '0.25rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {hasImage ? (
        <Card.Img
          src={urlFor(image).height(300).url()}
          alt="Card image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <span
          style={{
            color: '#6c757d',
            fontSize: '1rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          No Image Available
        </span>
      )}
    </div>
  );
};
