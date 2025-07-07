import React, { useRef, useEffect, useState } from 'react';
import {
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooterButton,
  ModalSlideWrapper
} from './styles';

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, children }) => {
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
        setShouldRender(false);
      }, 300);

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
          <ModalCloseButton onClick={(e) => {
            e.stopPropagation();
            triggerClose();
          }}>
            ×
          </ModalCloseButton>

          <form style={{ width: '100%' }}>
            {children}

            <div className="d-flex justify-content-end mt-4">
              <ModalFooterButton type="button" onClick={triggerClose}>
                Close
              </ModalFooterButton>
            </div>
          </form>
        </ModalContent>
      </ModalSlideWrapper>
    </ModalOverlay>
  );
};
