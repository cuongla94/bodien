import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ControlsWrapper, ThemedButton } from './styles';

interface CardItemControlsProps {
  isAdmin?: boolean;
  link?: { href: string; as?: string };
  theme?: {
    buttonBg?: string;
    buttonText?: string;
    primaryColor?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
  hidden?: boolean;
}

export const CardItemControls: React.FC<CardItemControlsProps> = ({
  isAdmin,
  link,
  theme,
  onEdit,
  onDelete,
  onToggleHidden,
  hidden,
}) => {
  if (!isAdmin && link) {
    return (
      <ControlsWrapper>
        <Link href={link.href} passHref>
          <ThemedButton
            size="sm"
            bg={theme?.primaryColor}
            text={theme?.buttonText}
          >
            Read More
          </ThemedButton>
        </Link>
      </ControlsWrapper>
    );
  }

  if (isAdmin) {
    return (
      <ControlsWrapper>
        <ThemedButton
          size="sm"
          onClick={onEdit}
          bg={theme?.primaryColor}
          text={theme?.buttonText}
        >
          Edit
        </ThemedButton>
        <Button
          size="sm"
          variant="danger"
          onClick={onDelete}
          style={{ color: '#fff', border: 'none' }}
        >
          Delete
        </Button>
        <Button size="sm" variant="secondary" onClick={onToggleHidden}>
          {hidden ? 'Unhide' : 'Hide'}
        </Button>
      </ControlsWrapper>
    );
  }

  return null;
};
