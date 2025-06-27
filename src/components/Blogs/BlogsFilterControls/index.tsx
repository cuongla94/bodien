import { Row, Col } from 'react-bootstrap';
import { FilterWrapper } from './styles';
import { BlogControls } from 'config/blog-config';
import { BlogControlSortOptions } from 'types/blog';
import { BlogSortDropdown } from './BlogSortDropDown';
import { BlogSearchbar } from './BlogSearchbar';
import { BlogFeaturedToggle } from './BlogFeaturedToggle';
import { BlogCategoryFilters } from './BlogCategoryFilters';

interface BlogsFilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: BlogControlSortOptions;
  onSortChange: (value: BlogControlSortOptions) => void;
  isFeaturedOnly: boolean;
  onToggleFeatured: () => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export const BlogsFilterControls = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  isFeaturedOnly,
  onToggleFeatured,
  selectedCategory,
  onCategoryChange,
}: BlogsFilterControlsProps) => {
  return (
    <FilterWrapper>
      <Row className="align-items-center justify-content w-100">
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

        {/* <Col md={2} className="text-end">
          <BlogFeaturedToggle
            checked={isFeaturedOnly}
            onToggle={onToggleFeatured}
          />
        </Col> */}
      </Row>
    </FilterWrapper>
  );
};
