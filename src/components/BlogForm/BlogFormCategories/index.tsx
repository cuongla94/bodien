import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { BlogFormCategorySelections } from 'config/blog-config';
import {
  CategoryListContainer,
  StyledInput,
  CategoryOption,
  InputWrapper,
} from './styles';
import { slugify } from 'utils/slugify';

interface BlogFormCategoriesProps {
  editCategory: { title: string; value: string };
  onChange: (category: { title: string; value: string }) => void;
}

export const BlogFormCategories = ({
  editCategory,
  onChange,
}: BlogFormCategoriesProps) => {
  const transformedCategories = [
    { title: 'All', value: 'all' },
    ...BlogFormCategorySelections.map((title) => ({
      title,
      value: slugify(title),
    })),
  ];

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ title: string; value: string } | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setSelected(editCategory);
    setSearch(editCategory.title || '');
  }, [editCategory]);

  const filtered = useMemo(() => {
    return transformedCategories.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, transformedCategories]);

  const capitalizeTitle = (str: string) => {
    return str
      .trim()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSelect = (item: { title: string; value: string }) => {
    setSelected(item);
    setSearch(item.title);
    onChange(item);
    setFocused(false);
  };

  const handleInputBlur = () => {
    setFocused(false);
    if (!selected || selected.title !== search) {
      const capitalized = capitalizeTitle(search);
      const value = capitalized.toLowerCase().replace(/[^\w]+/g, '-');
      const manualEntry = { title: capitalized, value };
      setSelected(manualEntry);
      onChange(manualEntry);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="mb-2">Category</Form.Label>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleInputBlur}
        />
        {focused && search && search !== selected?.title && (
          <CategoryListContainer>
            {filtered.length > 0 && (
              filtered.map((item) => (
                <CategoryOption
                  key={item.value}
                  onMouseDown={() => handleSelect(item)}
                  selected={selected?.value === item.value}
                >
                  {item.title}
                </CategoryOption>
              ))
            )}
          </CategoryListContainer>
        )}
      </InputWrapper>
    </Form.Group>
  );
};
