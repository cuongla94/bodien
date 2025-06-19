import React from 'react';
import { TagsWrapper, ThemedBadge } from './styles';

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
    <TagsWrapper>
      {tags.map((tag, idx) => (
        <ThemedBadge
          key={idx}
          bgColor={theme?.secondaryColor}
          textColor={theme?.buttonText}
        >
          {tag}
        </ThemedBadge>
      ))}
    </TagsWrapper>
  );
};
