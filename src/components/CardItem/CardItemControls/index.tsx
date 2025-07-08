import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ControlsWrapper, ThemedButton } from './styles';
import { BlogCardItem } from 'config/blog-config';

interface CardItemControlsProps {
  isAdmin?: boolean;
  slug?: string;
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
  slug,
  link,
  theme,
  onEdit,
  onDelete,
  onToggleHidden,
  hidden,
}) => {
  const baseUrl = getBaseUrl();
  const fullUrl = slug ? `${baseUrl}/app/blogs/${slug}` : '';


  const handleCopyLink = () => {
    if (fullUrl) {
      navigator.clipboard.writeText(fullUrl);
      alert('Link copied to clipboard!');
    }
  };

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
        <Button
          size="sm"
          variant="outline-primary"
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>
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
          variantType="edit"
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
        {slug && (
          <Button
            size="sm"
            variant="outline-primary"
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
        )}
      </ControlsWrapper>
    );
  }

  return null;
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};
