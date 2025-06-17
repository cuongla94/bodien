// components/CardItemAnalytics.tsx
import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';

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
    <div
      className="d-flex gap-3 align-items-center mb-2 text-muted"
      style={{ fontSize: '0.8rem' }}
    >
      {typeof numOfViews === 'number' && (
        <span className="d-flex align-items-center gap-1">
          <FiEye /> {numOfViews} view{numOfViews !== 1 ? 's' : ''}
        </span>
      )}
      {typeof numOfShares === 'number' && (
        <span className="d-flex align-items-center gap-1">
          <FiShare2 /> {numOfShares} share{numOfShares !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
};
