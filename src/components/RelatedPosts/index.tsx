import React from 'react';
import { IBlogPost } from 'types/blog';
import { SectionTitle, SectionWrapper } from './styles';
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
  onReadMoreClick
}) => {
  const categoryValue =
    typeof currentCategory === 'string'
      ? currentCategory
      : currentCategory?.value || currentCategory?.title;

  const related = allPosts
    .filter(
      (post) =>
        post._id !== currentPostId &&
        (typeof post.category === 'string'
          ? post.category === categoryValue
          : post.category?.value === categoryValue)
    )
    .slice(0, 5);

  return (
    <SectionWrapper>
      <SectionTitle>Related Posts</SectionTitle>
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
    </SectionWrapper>
  );
};
