import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { BlogFormCategorySelections } from 'config/blog-config';
import { CategoryListContainer } from './styles';

interface BlogFormCategoriesProps {
  editCategory: { title: string; value: string };
  onChange: (category: { title: string; value: string }) => void;
}

export const BlogFormCategories = ({
  editCategory,
  onChange,
}: BlogFormCategoriesProps) => {
  const transformedCategories = BlogFormCategorySelections.map((title) => ({
    title,
    value: title.toLowerCase().replace(/[^\w]+/g, '-'),
  }));

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ title: string; value: string } | null>(null);

  useEffect(() => {
    setSelected(editCategory);
  }, [editCategory]);

  const filtered = useMemo(() => {
    return transformedCategories.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSelect = (item: { title: string; value: string }) => {
    setSelected(item);
    onChange(item);
  };

  return (
    <Form.Group className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Form.Label className="mb-0 me-2">Category</Form.Label>
        <div style={{ position: 'relative', width: '50%' }}>
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control form-control-sm pe-4"
          />
          {search && (
            <span
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
                fontWeight: 'bold',
              }}
            >
              ×
            </span>
          )}
        </div>
      </div>

      <CategoryListContainer>
        {filtered.length === 0 ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
            }}
          >
            No results found
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.value}
              className={`p-2 rounded mb-1 cursor-pointer ${
                selected?.value === item.value ? 'bg-primary text-white' : 'hover-bg-light'
              }`}
              onClick={() => handleSelect(item)}
              style={{ cursor: 'pointer' }}
            >
              {item.title}
            </div>
          ))
        )}
      </CategoryListContainer>
    </Form.Group>
  );
};
