import React from 'react';
import { Card } from 'react-bootstrap';
import { urlFor } from 'apis';
import styles from './styles.module.scss';

interface CardItemImageProps {
  image?: any;
}

export const CardItemImage: React.FC<CardItemImageProps> = ({ image }) => {
  const hasImage = !!image;

  return (
    <div className={styles.cardimage_wrapper}>
      {hasImage ? (
        <Card.Img
          src={urlFor(image).height(300).url()}
          alt="Card image"
          className={styles.cardimage_image}
        />
      ) : (
        <span className={styles.cardimage_placeholdertext}>
          No Image Available
        </span>
      )}
    </div>
  );
};
