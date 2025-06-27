import { FiSearch, FiX } from 'react-icons/fi';
import {
  SearchInputWrapper,
  SearchIcon,
  StyledSearchInput,
  ClearIcon,
} from './styles';

interface BlogSearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const BlogSearchbar = ({
  value,
  onChange,
  placeholder = 'Search posts...',
}: BlogSearchbarProps) => {
  return (
    <SearchInputWrapper>
      <SearchIcon>
        <FiSearch size={16} />
      </SearchIcon>
      <StyledSearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <ClearIcon onClick={() => onChange('')}>
          <FiX size={14} />
        </ClearIcon>
      )}
    </SearchInputWrapper>
  );
};
