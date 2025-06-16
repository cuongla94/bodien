import { Card, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { urlFor } from 'apis';

interface ILink {
  href: string;
  as?: string;
}

interface ICardItemProps {
  title?: string;
  subtitle?: string;
  image?: any;
  date?: string;
  link?: ILink;
  theme?: any;
  tags?: string[];
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CardItem = ({
  title,
  subtitle,
  image,
  date,
  link,
  theme,
  tags = [],
  isAdmin = false,
  onEdit,
  onDelete,
}: ICardItemProps) => {
  const hasImage = !!image;

  return (
    <Card
      className="fj-card"
      style={{
        backgroundColor: theme?.cardBackground,
        color: theme?.mainTextColor,
        borderColor: theme?.borderColor,
      }}
    >
      <div className="card-body-wrapper">
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: !hasImage ? '#f8f9fa' : 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '0.25rem',
            borderTopRightRadius: '0.25rem',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {hasImage ? (
            <Card.Img
              src={urlFor(image).height(300).url()}
              alt="Card image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          ) : (
            <span
              style={{
                color: '#6c757d',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              No Image Available
            </span>
          )}
        </div>

        <Card.Body style={{ padding: '8px' }}>
          <Card.Title
            className="card-main-title"
            style={{ color: theme?.mainTextColor }}
          >
            {title && title.length > 40 ? title.substr(0, 40) + '...' : title}
          </Card.Title>

          {subtitle && (
            <Card.Text style={{ color: theme?.subTextColor }}>
              {subtitle}
            </Card.Text>
          )}

          {tags.length > 0 && (
            <div className="mb-2 d-flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  bg="secondary"
                  style={{
                    backgroundColor: theme?.secondaryColor,
                    color: theme?.buttonText,
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            {date && (
              <Card.Text
                className="small mb-0"
                style={{ color: theme?.subTextColor }}
              >
                Created on {date}
              </Card.Text>
            )}

            {!isAdmin && link && (
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
            )}

            {isAdmin && (
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
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
