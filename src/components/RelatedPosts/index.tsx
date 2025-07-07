import React from 'react';
import { IBlogPost } from 'types/blog';
import { RelatedPostsSectionTitle, RelatedPostsSectionWrapper } from './styles';
import { RelatedPostItem } from './RelatedPostItem';

interface RelatedPostsProps {
  allPosts: IBlogPost[];
  currentPostId: string;
  currentCategory?: string | { title: string; value: string };
  onReadMoreClick?: (post: IBlogPost) => void;
  theme?: any;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  allPosts,
  currentPostId,
  currentCategory,
  onReadMoreClick,
}) => {
  // Normalize currentCategory value
  const categoryValue =
    typeof currentCategory === 'string'
      ? currentCategory
      : currentCategory?.value || currentCategory?.title || '';

  // Filter related posts
  const related = allPosts
    .filter((post) => {
      if (post._id === currentPostId) return false;

      const postCategory =
        typeof post.category === 'string'
          ? post.category
          : post.category?.value || post.category?.title || '';

      return postCategory === categoryValue;
    })
    .slice(0, 5);

  return (
    <RelatedPostsSectionWrapper>
      <RelatedPostsSectionTitle>Related Posts</RelatedPostsSectionTitle>
      {related.length === 0 ? (
        <p className="text-muted">No related posts available.</p>
      ) : (
        <div>
          {related.map((post) => (
            <RelatedPostItem
              key={post._id}
              post={post}
              onClick={onReadMoreClick}
            />
          ))}
        </div>
      )}
    </RelatedPostsSectionWrapper>
  );
};
