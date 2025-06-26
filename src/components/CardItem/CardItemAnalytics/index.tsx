import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { AnalyticsWrapper, AnalyticsItem } from './styles';
import { BlogCardItem } from 'config/blog-config';

interface CardItemAnalyticsProps {
  isAdmin: boolean;
  numOfViews?: number;
  numOfShares?: number;
}

export const CardItemAnalytics: React.FC<CardItemAnalyticsProps> = ({
  isAdmin,
  numOfViews,
  numOfShares,
}) => {
  if (!isAdmin || (!numOfViews && !numOfShares)) return null;

  return (
    <AnalyticsWrapper>
      {typeof numOfViews === 'number' && (
        <AnalyticsItem>
          <FiEye /> {numOfViews} {BlogCardItem.blogViewText}{numOfViews !== 1 ? 's' : ''}
        </AnalyticsItem>
      )}
      {typeof numOfShares === 'number' && (
        <AnalyticsItem>
          <FiShare2 /> {numOfShares} {BlogCardItem.blogShareText}{numOfShares !== 1 ? 's' : ''}
        </AnalyticsItem>
      )}
    </AnalyticsWrapper>
  );
};
