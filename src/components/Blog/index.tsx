import React from 'react';
import { BlogModal } from './BlogModal';
import { IBlogPost } from 'types/blog';
import { BlogDetails } from './BlogDetails';

interface BlogProps {
  blog: IBlogPost;
  isOpen: boolean;
  onClose: () => void;
}

export const Blog: React.FC<BlogProps> = ({
  blog,
  isOpen,
  onClose,
}) => {
  return (
    <BlogModal isOpen={isOpen} onClose={onClose}>
      <BlogDetails blog={blog} />
    </BlogModal>
  );
};
