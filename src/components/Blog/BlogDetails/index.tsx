import React from 'react';
import { BlogHeader } from './BlogHeader';
import BlogSections from './BlogSections';
import { urlFor } from 'apis';
import { IBlogPost } from 'types/blog';

interface BlogProps {
  blog: IBlogPost;
}

export const BlogDetails: React.FC<BlogProps> = ({ blog }) => {
  const coverImage = blog.coverImage?.asset
    ? urlFor(blog.coverImage).height(600).url()
    : null;

  const date = new Date(blog.publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedAt = new Date(blog._updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-4">
      <BlogHeader
        title={blog.title}
        coverImage={coverImage}
        date={date}
        updatedAt={updatedAt}
      />

      {blog.sections && <BlogSections sections={blog.sections} />}
    </div>
  );
};
