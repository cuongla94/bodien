import React, { useRef, useEffect, useState } from 'react';
import {
  BlogModalCloseButton,
  BlogModalContent,
  BlogModalOverlay,
  BlogModalFooterButton,
  SlideWrapper
} from './styles';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animation, setAnimation] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimation('in');
    } else {
      setAnimation('out');
      const timeout = setTimeout(() => {
        setShouldRender(false); // Only unmount after animation
      }, 300); // Match your animation duration (0.3s)

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      triggerClose();
    }
  };

  const triggerClose = () => {
    setAnimation('out');
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <BlogModalOverlay onClick={handleOverlayClick}>
      <SlideWrapper animation={animation}>
        <BlogModalContent ref={contentRef}>
          <BlogModalCloseButton onClick={triggerClose}>×</BlogModalCloseButton>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {children}
          </div>

          <div className="d-flex justify-content-end mt-4" style={{ width: '100%' }}>
            <BlogModalFooterButton onClick={triggerClose}>Close</BlogModalFooterButton>
          </div>
        </BlogModalContent>
      </SlideWrapper>
    </BlogModalOverlay>
  );
};
