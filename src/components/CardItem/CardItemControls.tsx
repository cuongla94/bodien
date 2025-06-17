import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

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
}

export const CardItemControls: React.FC<CardItemControlsProps> = ({
  isAdmin,
  link,
  theme,
  onEdit,
  onDelete,
}) => {
  if (!isAdmin && link) {
    return (
      <Link href={link.href} passHref>
        <Button
          variant="info"
          size="sm"
          style={{
            backgroundColor: theme?.buttonBg,
            color: theme?.buttonText,
            border: 'none',
          }}
        >
          Read More
        </Button>
      </Link>
    );
  }

  if (isAdmin) {
    return (
      <div className="d-flex gap-2">
        <Button
          size="sm"
          onClick={onEdit}
          style={{
            backgroundColor: theme?.primaryColor,
            color: theme?.buttonText,
            border: 'none',
          }}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={onDelete}
          style={{
            color: '#fff',
            border: 'none',
          }}
        >
          Delete
        </Button>
      </div>
    );
  }

  return null;
};
