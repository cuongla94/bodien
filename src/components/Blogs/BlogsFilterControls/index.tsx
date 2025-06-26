import { Row, Col, Form } from 'react-bootstrap';
import { FilterWrapper, FeaturedToggleWrapper } from './styles';
import { BlogControls } from 'config/blog-config';

type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc'
  | 'popularity';

interface BlogsFilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  isFeaturedOnly: boolean;
  onToggleFeatured: () => void;
}

export const BlogsFilterControls = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  isFeaturedOnly,
  onToggleFeatured,
}: BlogsFilterControlsProps) => {
  return (
    <FilterWrapper>
      <Row className="align-items-center justify-content w-100">
        <Col className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </Col>

        <Col md={2} className="mb-2">
          <Form.Select
            value={sortOption}
            onChange={e => onSortChange(e.target.value as SortOption)}
          >
            {BlogControls.filters.map(item => (
              <option>{item}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2} className="text-end">
          <FeaturedToggleWrapper>
            <Form.Check
              type="switch"
              id="featured-only"
              label={BlogControls.featuredOnly}
              checked={isFeaturedOnly}
              onChange={onToggleFeatured}
            />
          </FeaturedToggleWrapper>
        </Col>
      </Row>
    </FilterWrapper>
  );
};
