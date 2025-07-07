import React, { useRef, useEffect, useState } from 'react';
import {
  BlogViewModalCloseButton,
  BlogViewModalContent,
  BlogViewModalOverlay,
  BlogViewModalFooterButton,
  BlogViewModalSlideWrapper
} from './styles';

interface BlogViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BlogViewModal: React.FC<BlogViewModalProps> = ({ isOpen, onClose, children }) => {
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
    <BlogViewModalOverlay onClick={handleOverlayClick}>
      <BlogViewModalSlideWrapper animation={animation}>
        <BlogViewModalContent ref={contentRef}>
          <BlogViewModalCloseButton
            onClick={(e) => {
              e.stopPropagation();
              triggerClose();
            }}
          >
            ×
          </BlogViewModalCloseButton>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {children}
          </div>

          <div className="d-flex justify-content-end mt-4" style={{ width: '100%' }}>
            <BlogViewModalFooterButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerClose();
              }}
            >
              Close
            </BlogViewModalFooterButton>
          </div>
        </BlogViewModalContent>
      </BlogViewModalSlideWrapper>
    </BlogViewModalOverlay>
  );
};
