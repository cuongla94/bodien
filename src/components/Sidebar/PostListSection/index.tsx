import React from 'react';
import { IBlogPost } from 'types/blog';
import { SectionWrapper, SectionHeaderRow, SectionTitle } from './styles';
import { RelatedPostItem } from '../RelatedPostItem';
import { AnimatedLink } from 'common/AnimatedLink';
import { AppLinks } from 'config/navigation-config';

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
      <SectionHeaderRow>
        <SectionTitle>{title}</SectionTitle>
        {posts.length > 0 && (
          <AnimatedLink href={`${AppLinks.blogs.link}?sort=popularity`} uppercase={false}>
            See More
          </AnimatedLink>
        )}
      </SectionHeaderRow>

      {posts.length === 0 ? (
        <p className="text-muted">No post available.</p>
      ) : (
        posts.map((post) => (
          <RelatedPostItem key={post._id} post={post} onClick={onItemClick} />
        ))
      )}
    </SectionWrapper>
  );
};
