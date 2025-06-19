import { Card } from 'react-bootstrap';
import { CardItemAnalytics } from './CardItemAnalytics';
import { CardItemImage } from './CardItemImage';
import { CardItemTags } from './CardItemTags';
import { CardItemControls } from './CardItemControls';

interface ICardItemProps {
  title: string;
  subtitle?: string;
  image?: any;
  date: string;
  link?: any;
  theme?: any;
  tags?: string[];
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
  hidden?: boolean;
  numOfViews?: number;
  numOfShares?: number;
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
  onToggleHidden,
  hidden,
  numOfViews,
  numOfShares,
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
        <CardItemImage image={image} />
        <Card.Body style={{ padding: '8px' }}>
          <Card.Title
            className="card-main-title"
            style={{ color: theme?.mainTextColor, margin: '.8rem 0' }}
          >
            {title}
          </Card.Title>
          <CardItemTags tags={tags} />
          <CardItemAnalytics
            isAdmin={isAdmin}
            numOfViews={numOfViews}
            numOfShares={numOfShares}
          />
          <div className="d-flex justify-content-between align-items-center mt-4">
            {date && (
              <Card.Text
                className="small mb-0"
                style={{ color: theme?.subTextColor }}
              >
                Added on {date}
              </Card.Text>
            )}
            <CardItemControls
              isAdmin={isAdmin}
              link={link}
              theme={theme}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleHidden={onToggleHidden}
              hidden={hidden}
            />
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
