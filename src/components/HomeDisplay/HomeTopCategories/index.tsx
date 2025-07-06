// src/components/HomeTopCategories/index.tsx
import React from 'react';
import {
  SectionWrapper,
  SectionTitle,
  CategoriesGrid
} from './styles';
import { HomeCategoryItem } from './HomeCategoryItem';
import { Col, Row } from 'react-bootstrap';

// src/components/HomeTopCategories/data.ts
export const categories = [
  {
    name: 'Accessories',
    count: 0,
    image: '/images/accessories.jpg'
  },
  {
    name: 'Air',
    count: 2,
    image: '/images/air.jpg'
  },
  {
    name: 'Bikes',
    count: 2,
    image: '/images/bikes.jpg'
  },
  {
    name: 'Car',
    count: 3,
    image: '/images/car.jpg'
  },
  {
    name: 'Headphones',
    count: 2,
    image: '/images/headphones.jpg'
  },
  {
    name: 'Smartwatch',
    count: 3,
    image: '/images/smartwatch.jpg'
  }
];


export const HomeTopCategories = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Top Categories To Explore</SectionTitle>
      <Row className="g-4 justify-content-center">
        {categories.map((category) => (
          <Col
            key={category.name}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="d-flex justify-content-center"
          >
            <HomeCategoryItem
              name={category.name}
              count={category.count}
              image={category.image}
            />
          </Col>
        ))}
      </Row>
    </SectionWrapper>
  );
};
