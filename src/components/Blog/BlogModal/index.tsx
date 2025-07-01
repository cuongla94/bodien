import React from 'react';
import { BlogModalCloseButton, BlogModalContent, BlogModalOverlay } from './styles';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <BlogModalOverlay>
      <BlogModalContent>
        <BlogModalCloseButton onClick={onClose}>×</BlogModalCloseButton>
        {children}
      </BlogModalContent>
    </BlogModalOverlay>
  );
};
