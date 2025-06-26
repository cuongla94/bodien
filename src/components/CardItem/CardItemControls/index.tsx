import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ControlsWrapper, ThemedButton } from './styles';
import { BlogCardItem } from 'config/blog-config';

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
            {BlogCardItem.readMoreText}
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
          {BlogCardItem.adminEditControlText}
        </ThemedButton>
        <Button
          size="sm"
          variant="danger"
          onClick={onDelete}
          style={{ color: '#fff', border: 'none' }}
        >
          {BlogCardItem.adminDeleteControlText}
        </Button>
        <Button size="sm" variant="secondary" onClick={onToggleHidden}>
          {hidden ? 'Unhide' : 'Hide'}
        </Button>
      </ControlsWrapper>
    );
  }

  return null;
};
