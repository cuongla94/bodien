import { useMemo, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import {
  StyledSelectTrigger,
  StyledSelectContent,
  StyledSelectViewport,
  StyledSelectItem,
  StyledSelectSearchWrapper,
  StyledSelectSearchInput,
} from './styles';
import { BlogFormCategorySelections } from 'config/blog-config';

// 'all' will represent no category filter
const transformedCategories = [
  { title: 'All', value: 'all' },
  ...BlogFormCategorySelections.map((title) => ({
    title,
    value: title.toLowerCase().replace(/[^\w]+/g, '-'),
  })),
];

interface BlogCategoryFiltersProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const BlogCategoryFilters = ({
  value,
  onChange,
  placeholder = 'Select Category',
}: BlogCategoryFiltersProps) => {
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    return transformedCategories.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="me-3">
      <Select.Root
        value={value === '' ? 'all' : value}
        onValueChange={(val) => onChange(val === 'all' ? '' : val)}
      >
        <StyledSelectTrigger aria-label="Category Filter">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <FiChevronDown />
          </Select.Icon>
        </StyledSelectTrigger>
        <StyledSelectContent position="popper" side="bottom" align="start" sideOffset={5}>
          <StyledSelectSearchWrapper>
            <StyledSelectSearchInput
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </StyledSelectSearchWrapper>
          <StyledSelectViewport>
            <Select.Group>
              {filteredCategories.map(({ title, value }) => (
                <StyledSelectItem key={value} value={value}>
                  <Select.ItemText>{title}</Select.ItemText>
                  <Select.ItemIndicator className="ms-auto">
                    <FiCheck />
                  </Select.ItemIndicator>
                </StyledSelectItem>

              ))}
            </Select.Group>
          </StyledSelectViewport>
        </StyledSelectContent>
      </Select.Root>
    </div>
  );
};
