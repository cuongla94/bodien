import React from 'react';
import { SectionTitle, SectionWrapper } from './styles';
import { HomeConfig } from 'config/home-config';

interface Category {
  label: string;
  count: number;
  icon?: string;
}

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <SectionWrapper>
      <SectionTitle>{HomeConfig.sidebar.categoriesTitle}</SectionTitle>
      {categories.map((cat, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              backgroundColor: '#f0f4ff',
              borderRadius: '50%',
              padding: '0.5rem',
              marginRight: '1rem',
            }}
          >
            {/* You can replace this with an icon */}
            <span role="img" aria-label="icon">📦</span>
          </div>
          <div style={{ flex: 1 }}>
            <strong>{cat.label}</strong>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>{cat.count} Reviews</div>
          </div>
          <button
            style={{
              border: 'none',
              background: '#f5f5f5',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer'
            }}
          >
            &gt;
          </button>
        </div>
      ))}
    </SectionWrapper>
  );
};
