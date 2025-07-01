import React from 'react';
import { IBlogPost } from 'types/blog';
import { SectionTitle, SectionWrapper } from './styles';
import { RelatedPostItem } from '../RelatedPostItem';

interface PostListSectionProps {
  title: string;
  posts: IBlogPost[];
  onItemClick?: (post: IBlogPost) => void;
}

export const PostListSection: React.FC<PostListSectionProps> = ({
  title,
  posts,
  onItemClick
}) => {
  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      {posts.length === 0 ? (
        <p className="text-muted">No post available.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <RelatedPostItem key={post._id} post={post} onClick={onItemClick} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};
