import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ControlsWrapper, ThemedButton } from './styles';

interface ILink {
  href: string;
  as?: string;
}

interface CardItemControlsProps {
  isAdmin?: boolean;
  link?: ILink;
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
      <Link href={link.href} passHref>
        <ThemedButton
          as="a"
          variant="info"
          size="sm"
          bg={theme?.buttonBg}
          text={theme?.buttonText}
        >
          Read More
        </ThemedButton>
      </Link>
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
