import { Row, Col } from 'react-bootstrap';
import { FilterWrapper } from './styles';
import { BlogControls } from 'config/blog-config';
import { BlogControlSortOptions } from 'types/blog';
import { BlogSortDropdown } from './BlogSortDropDown';
import { BlogSearchbar } from './BlogSearchbar';
import { BlogCategoryFilters } from './BlogCategoryFilters';

interface BlogsFilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: BlogControlSortOptions;
  onSortChange: (value: BlogControlSortOptions) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  showHidden: boolean;
  onToggleHidden: () => void;
}

export const BlogsFilterControls = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  showHidden,
  onToggleHidden,
}: BlogsFilterControlsProps) => {
  return (
    <FilterWrapper>
      <Row className="align-items-center justify-content-between w-100">
        <Col className="mb-2">
          <BlogSearchbar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={BlogControls.searchPlaceHolder}
          />
        </Col>

        <Col md={3} className="mb-2">
          <BlogCategoryFilters
            value={selectedCategory}
            onChange={onCategoryChange}
          />
        </Col>

        <Col md={2} className="mb-2">
          <BlogSortDropdown value={sortOption} onChange={onSortChange} />
        </Col>

        <Col md="auto" className="mb-2 d-flex align-items-center" style={{ marginLeft: '12px' }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="hiddenToggle"
              checked={showHidden}
              onChange={onToggleHidden}
            />
            <label className="form-check-label ms-1" htmlFor="hiddenToggle">
              Hidden
            </label>
          </div>
        </Col>
      </Row>
    </FilterWrapper>
  );
};
