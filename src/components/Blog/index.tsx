// components/Blog/index.tsx
import React from 'react';
import { IBlogPost } from 'types/blog';
import { RelatedPosts } from 'components/RelatedPosts';
import { BlogView } from 'components/Blog/BlogView';

interface BlogProps {
  blog: IBlogPost;
  isOpen: boolean;
  onClose: () => void;
  allPosts: IBlogPost[];
  onReadMoreClick?: (post: IBlogPost) => void;
  theme?: any;
}

export const Blog: React.FC<BlogProps> = ({
  blog,
  isOpen,
  onClose,
  allPosts,
  onReadMoreClick,
  theme,
}) => {
  const sections = blog.sections || [];

  return (
    <BlogView
      slug={blog.slug}
      title={blog.title}
      date={blog.publishedAt}
      category={blog.category}
      sections={[
        ...sections,
        {
          _type: 'product',
        },
      ]}
      isOpen={isOpen}
      onClose={onClose}
      isPreview={true}
      isFormPreview={false}
    >
      <RelatedPosts
        allPosts={allPosts}
        currentPostId={blog._id}
        currentCategory={blog.category}
        onReadMoreClick={onReadMoreClick}
        theme={theme}
      />
    </BlogView>
  );
};
