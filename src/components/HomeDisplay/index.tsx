import React from 'react';
import { LatestNews } from './LatestNews';
import { LatestPosts } from './LatestPosts';
import { HomeBanner } from './HomeBanner';

interface HomeDisplayProps {
  latestNews?: any[];
  theme?: any;
}

export const HomeDisplay = ({ latestNews = [], theme }: HomeDisplayProps) => {
  return (
    <>
      <HomeBanner />
      <LatestPosts theme={theme} />
      {latestNews.length > 0 && <LatestNews articles={latestNews} />}
    </>
  );
};
