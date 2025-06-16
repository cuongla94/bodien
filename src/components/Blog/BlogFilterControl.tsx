// components/BlogFilterControls.tsx
import { Form } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  onToggleSort
}: BlogFilterControlsProps) => {
  const Icon = sortAsc ? ChevronUp : ChevronDown;

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 p-3 border rounded bg-light shadow-sm">
            <div className="d-inline-flex align-items-center gap-2">
        <span className="text-muted small">Sort by date</span>
        <Icon
          size={20}
          className="clickable text-dark"
          onClick={onToggleSort}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <Form.Control
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ maxWidth: '300px' }}
      />
    </div>
  );
};
