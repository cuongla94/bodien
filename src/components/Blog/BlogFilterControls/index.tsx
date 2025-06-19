// components/BlogFilterControls/index.tsx
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FilterWrapper, SortControl, SearchInput } from './styles';

interface BlogFilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortAsc: boolean;
  onToggleSort: () => void;
}

export const BlogFilterControls = ({
  searchTerm,
  onSearchChange,
  sortAsc,
  onToggleSort,
}: BlogFilterControlsProps) => {
  const Icon = sortAsc ? FaChevronUp : FaChevronDown;

  return (
    <FilterWrapper>
      <SortControl>
        <span>Sort by date</span>
        <Icon size={16} onClick={onToggleSort} style={{ cursor: 'pointer' }} />
      </SortControl>

      <SearchInput
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </FilterWrapper>
  );
};
