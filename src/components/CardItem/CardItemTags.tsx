import React from 'react';
import { Badge } from 'react-bootstrap';

interface CardItemTagsProps {
  tags: string[];
  theme?: {
    secondaryColor?: string;
    buttonText?: string;
  };
}

export const CardItemTags: React.FC<CardItemTagsProps> = ({ tags, theme }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-2 d-flex flex-wrap gap-1">
      {tags.map((tag, idx) => (
        <Badge
          key={idx}
          bg="secondary"
          style={{
            backgroundColor: theme?.secondaryColor,
            color: theme?.buttonText,
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
          }}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
