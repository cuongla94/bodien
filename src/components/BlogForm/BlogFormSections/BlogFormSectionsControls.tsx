import { AdminBlogForm } from 'config/admin-config';
import { Row, Col, Button } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';

export const BlogFormSectionsControls = ({
  index,
  canAddAffiliateLink,
  addAffiliateLink,
  removeSection,
  moveSectionUp,
  moveSectionDown,
  showAffiliateButton = true,
  totalSections,
}: {
  index: number;
  canAddAffiliateLink?: boolean;
  addAffiliateLink?: (index: number) => void;
  removeSection: (index: number) => void;
  moveSectionUp: (index: number) => void;
  moveSectionDown: (index: number) => void;
  showAffiliateButton?: boolean;
  totalSections: number;
}) => {
  return (
    <Row className="align-items-center">
      {showAffiliateButton && (
        <Col xs="auto">
          <Button
            size="sm"
            variant="dark"
            disabled={!canAddAffiliateLink}
            onClick={() => addAffiliateLink?.(index)}
          >
            + {AdminBlogForm.controls.affiliateLink}
          </Button>
        </Col>
      )}
      <Col className="text-end d-flex gap-2 justify-content-end">
        {index > 0 && (
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => moveSectionUp(index)}
          >
            <FaArrowUp />
          </Button>
        )}
        {index < totalSections - 1 && (
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => moveSectionDown(index)}
          >
            <FaArrowDown />
          </Button>
        )}
        <Button variant="danger" size="sm" onClick={() => removeSection(index)}>
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
};
