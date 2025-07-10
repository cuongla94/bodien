// src/components/HomeTopCategories/index.tsx
import React from 'react';
import {
  SectionWrapper,
  SectionTitle
} from './styles';
import { HomeCategoryItem } from './HomeCategoryItem';
import { Col, Row } from 'react-bootstrap';
import carImage from 'assets/HomeCategories/Car.webp';
import healthImage from 'assets/HomeCategories/Health.webp';
import gamingImage from 'assets/HomeCategories/Gaming.webp';
import homeImage from 'assets/HomeCategories/Home.webp';
import beautyImage from 'assets/HomeCategories/Beauty.webp';
import workImage from 'assets/HomeCategories/Work.webp';

export const categories = [
  {
    name: 'Home',
    count: 0,
    image: homeImage
  },
  {
    name: 'Health',
    count: 1,
    image: healthImage
  },
  {
    name: 'Gaming',
    count: 2,
    image: gamingImage
  },
  {
    name: 'Car Accessories',
    count: 3,
    image: carImage
  },
  {
    name: 'Beauty',
    count: 4,
    image: beautyImage
  },
  {
    name: 'Work & Productivity',
    count: 4,
    image: workImage
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
