// components/BlogFilterControls/index.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const Icon = sortAsc ? ChevronUp : ChevronDown;

  return (
    <FilterWrapper>
      <SortControl>
        <span>Sort by date</span>
        <Icon size={20} onClick={onToggleSort} />
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
