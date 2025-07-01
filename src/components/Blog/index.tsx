import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BlogModal } from './BlogModal';
import { IBlogPost } from 'types/blog';
import { BlogDetails } from './BlogDetails';
import { RelatedPosts } from 'components/RelatedPosts';

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
  return (
    <BlogModal isOpen={isOpen} onClose={onClose}>
      <Row>
        <Col lg={8} md={12}>
          <BlogDetails blog={blog} />
        </Col>
        <Col lg={4} md={12}>
          <RelatedPosts
            allPosts={allPosts}
            currentPostId={blog._id}
            currentCategory={blog.category}
            onReadMoreClick={onReadMoreClick}
            theme={theme}
          />
        </Col>
      </Row>
    </BlogModal>
  );
};
