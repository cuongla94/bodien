import React from 'react';
import { LatestNews } from './LatestNews';
import { LatestPosts } from './LatestPosts';

interface HomeDisplayProps {
  latestNews?: any[];
  theme?: any;
}

export const HomeDisplay = ({ latestNews = [], theme }: HomeDisplayProps) => {
  return (
    <>
      <LatestPosts theme={theme} />
      {latestNews.length > 0 && <LatestNews articles={latestNews} />}
    </>
  );
};
