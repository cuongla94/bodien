// src/components/HomeTopCategories/index.tsx
import React from 'react';
import {
  SectionWrapper,
  SectionTitle
} from './styles';
import { HomeCategoryItem } from './HomeCategoryItem';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';

import carImage from 'assets/HomeCategories/Car.webp';
import healthImage from 'assets/HomeCategories/Health.webp';
import gamingImage from 'assets/HomeCategories/Gaming.webp';
import homeImage from 'assets/HomeCategories/Home.webp';
import beautyImage from 'assets/HomeCategories/Beauty.webp';
import workImage from 'assets/HomeCategories/Work.webp';
import { slugify } from 'utils/slugify';
import { AppLinks } from 'config/navigation-config';

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
    name: 'Gaming Accessories',
    count: 2,
    image: gamingImage
  },
  {
    name: 'Car Accessories',
    count: 3,
    image: carImage
  },
  {
    name: 'Beauty & Skincare',
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
            <Link
              href={`${AppLinks.blogs.link}?sort=relevant&category=${slugify(category.name)}`}
              passHref
              legacyBehavior
            >
              <a style={{ textDecoration: 'none', width: '100%' }}>
                <HomeCategoryItem
                  name={category.name}
                  count={category.count}
                  image={category.image}
                />
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </SectionWrapper>
  );
};
