import { Card } from 'react-bootstrap';
import { CardItemAnalytics } from './CardItemAnalytics';
import { CardItemImage } from './CardItemImage';
import { CardItemTags } from './CardItemTags';
import { CardItemControls } from './CardItemControls';

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
            style={{ color: theme?.mainTextColor }}
          >
            {title && title.length > 40 ? title.substr(0, 40) + '...' : title}
          </Card.Title>
          <hr />
          <CardItemTags tags={tags} />
          <CardItemAnalytics
            isAdmin={isAdmin}
            numOfViews={numOfViews}
            numOfShares={numOfShares} />
          <div className="d-flex justify-content-between align-items-center">
            {date && (
              <Card.Text
                className="small mb-0"
                style={{ color: theme?.subTextColor }}
              >
                Created on {date}
              </Card.Text>
            )}
            <CardItemControls
              isAdmin={isAdmin}
              link={link}
              theme={theme}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
