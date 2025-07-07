import React, { useRef, useEffect, useState } from 'react';
import {
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooterButton,
  ModalSlideWrapper
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
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalSlideWrapper animation={animation}>
        <ModalContent ref={contentRef}>
          <ModalCloseButton
            onClick={(e) => {
              e.stopPropagation();
              triggerClose();
            }}
          >
            ×
          </ModalCloseButton>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {children}
          </div>

          <div className="d-flex justify-content-end mt-4" style={{ width: '100%' }}>
            <ModalFooterButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerClose();
              }}
            >
              Close
            </ModalFooterButton>
          </div>
        </ModalContent>
      </ModalSlideWrapper>
    </ModalOverlay>
  );
};
