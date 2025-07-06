import React from 'react';
import Link from 'next/link';
import {
  HomeBannerWrapper,
  HomeBannerContent,
  HomeBannerHeading,
  HomeBannerSubheading,
  HomeBannerCTAButton,
  HomeBannerRight
} from './styles';

export const HomeBanner = () => {
  return (
    <HomeBannerWrapper>
      <HomeBannerContent>
        <HomeBannerHeading>
          Discover Top <span>Tech Reviews</span> & Buying Guides
        </HomeBannerHeading>
        <HomeBannerSubheading>
          Stay ahead with expert insights on the latest gadgets, apps, and innovations. Whether you're a casual user or a tech enthusiast — we’ve got your back.
        </HomeBannerSubheading>
        <Link href="/blogs" passHref>
          <HomeBannerCTAButton>Explore All Reviews →</HomeBannerCTAButton>
        </Link>
      </HomeBannerContent>

      <HomeBannerRight>
        {/* Will replace with <HomeBannerCarousel /> */}
        <div className="carousel-placeholder">
          Carousel Coming Soon...
        </div>
      </HomeBannerRight>
    </HomeBannerWrapper>
  );
};
