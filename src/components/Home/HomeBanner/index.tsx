import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HomeBannerWrapper,
  HomeBannerContent,
  HomeBannerHeading,
  HomeBannerSubheading,
  HomeBannerCTAButton,
  HomeBannerRow,
  HomeBannerImageWrapper,
  HomeBannerCarousel
} from './styles';
import HomeBannerImage from 'assets/HomeBannerImage.png';
import { AppLinks } from 'config/navigation-config';
import { Container } from 'react-bootstrap';

export const HomeBanner = () => {
  return (
    <HomeBannerWrapper>
      <Container   className="flex-grow-1 d-flex flex-column">
        <HomeBannerRow>
          <HomeBannerContent>
            <HomeBannerHeading>
              Discover Top <span>Tech Reviews</span> & Buying Guides
            </HomeBannerHeading>
            <HomeBannerSubheading>
              Stay ahead with expert insights on the latest gadgets, apps, and innovations. Whether you're a casual user or a tech enthusiast — we’ve got your back.
            </HomeBannerSubheading>
            <Link href={AppLinks.blogs.link} passHref>
              <HomeBannerCTAButton>Explore All Reviews →</HomeBannerCTAButton>
            </Link>
          </HomeBannerContent>

          <HomeBannerImageWrapper>
            <Image
              src={HomeBannerImage}
              alt="Tech Reviews"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '1rem'
              }}
              priority
            />
          </HomeBannerImageWrapper>
        </HomeBannerRow>
      </Container>
    </HomeBannerWrapper>
  );
};
