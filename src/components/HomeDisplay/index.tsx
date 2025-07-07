import React from 'react';
import { LatestNews, LatestPosts } from './LatestSections';
import { HomeBanner } from './HomeBanner';
import { HomeTopCategories } from './HomeTopCategories';

interface HomeDisplayProps {
  latestNews?: any[];
  theme?: any;
}

export const HomeDisplay = ({ latestNews = [], theme }: HomeDisplayProps) => {
  return (
    <>
      <HomeBanner />
      <HomeTopCategories />
      <LatestPosts theme={theme} />
      {latestNews.length > 0 && <LatestNews articles={latestNews} />}
    </>
  );
};
