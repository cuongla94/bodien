import { Form } from 'react-bootstrap';
import { FeaturedToggleWrapper } from './styles';
import { BlogControls } from 'config/blog-config';

interface BlogFeaturedToggleProps {
  checked: boolean;
  onToggle: () => void;
}

export const BlogFeaturedToggle = ({
  checked,
  onToggle,
}: BlogFeaturedToggleProps) => {
  return (
    <FeaturedToggleWrapper>
      <Form.Check
        type="switch"
        id="featured-only"
        label={BlogControls.featuredOnly}
        checked={checked}
        onChange={onToggle}
      />
    </FeaturedToggleWrapper>
  );
};
