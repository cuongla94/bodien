import { FiChevronDown } from 'react-icons/fi';
import * as Select from '@radix-ui/react-select';
import {
  StyledSelectTrigger,
  StyledSelectContent,
  StyledSelectItem,
  StyledSelectViewport,
} from './styles';
import { BlogControls } from 'config/blog-config';

interface BlogSortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const BlogSortDropdown = ({ value, onChange }: BlogSortDropdownProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <StyledSelectTrigger aria-label="Sort Options">
        <Select.Value />
        <Select.Icon>
          <FiChevronDown />
        </Select.Icon>
      </StyledSelectTrigger>
      <StyledSelectContent position="popper" sideOffset={5}>
        <StyledSelectViewport>
          <Select.Group>
            {BlogControls.sorts.map(({ title, value }) => (
              <StyledSelectItem key={value} value={value}>
                <Select.ItemText>{title}</Select.ItemText>
              </StyledSelectItem>
            ))}
          </Select.Group>
        </StyledSelectViewport>
      </StyledSelectContent>
    </Select.Root>
  );
};
