import React, { useState, useRef, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

import {
  NewsFiltersWrapper,
  NewsFiltersCustomSelectWrapper,
  NewsFiltersStyledLabel,
  NewsFiltersCustomOptionsWrapper,
  NewsFiltersCustomOption,
  NewsFilterInput,
  SortCol,
  CategoryCol,
  SourceCol,
} from './styles';

export type NewsFiltersProps = {
  filters: {
    category: string;
    source: string;
    published_at: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      source: string;
      published_at: string;
    }>
  >;
  allCategories: string[];
  allSources: string[];
};

export function NewsFilters({
  filters,
  setFilters,
  allCategories,
  allSources,
}: NewsFiltersProps) {
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showSourceOptions, setShowSourceOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [sourceSearch, setSourceSearch] = useState('');

  const categoryRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryOptions(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
        setShowSourceOptions(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilteredOptions = (
    options: string[],
    search: string,
    selected: string
  ): string[] => {
    const lowerSearch = search.toLowerCase();
    let matches = options.filter((item) =>
      item.toLowerCase().includes(lowerSearch)
    );

    if (matches.length === 0 && selected) {
      return [selected];
    }

    if (selected && !matches.includes(selected)) {
      matches.push(selected);
    }

    return matches;
  };

  const filteredCategories = getFilteredOptions(
    allCategories,
    categorySearch,
    filters.category
  );
  const filteredSources = getFilteredOptions(
    allSources,
    sourceSearch,
    filters.source
  );

  return (
    <NewsFiltersWrapper>
      <Row className="w-100">
        {/* SORT */}
        <SortCol as="div" className="col-5 col-sm-5 col-md-2">
          <NewsFiltersCustomSelectWrapper ref={sortRef}>
            <NewsFiltersStyledLabel onClick={() => setShowSortOptions((prev) => !prev)}>
              {filters.published_at === 'asc' ? 'Oldest First' : 'Newest First'}
              {showSortOptions ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </NewsFiltersStyledLabel>

            {showSortOptions && (
              <NewsFiltersCustomOptionsWrapper>
                <NewsFiltersCustomOption
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, published_at: 'desc' }));
                    setShowSortOptions(false);
                  }}
                  $active={filters.published_at === 'desc'}
                >
                  Newest First
                </NewsFiltersCustomOption>
                <NewsFiltersCustomOption
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, published_at: 'asc' }));
                    setShowSortOptions(false);
                  }}
                  $active={filters.published_at === 'asc'}
                >
                  Oldest First
                </NewsFiltersCustomOption>
              </NewsFiltersCustomOptionsWrapper>
            )}
          </NewsFiltersCustomSelectWrapper>
        </SortCol>

        {/* CATEGORY */}
        <CategoryCol as="div" className="col-7 col-sm-7 col-md-4">
          <NewsFiltersCustomSelectWrapper ref={categoryRef}>
            <NewsFiltersStyledLabel onClick={() => setShowCategoryOptions((prev) => !prev)}>
              {filters.category || 'All Categories'}
              {showCategoryOptions ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </NewsFiltersStyledLabel>

            {showCategoryOptions && (
              <NewsFiltersCustomOptionsWrapper>
                <div style={{ position: 'relative' }}>
                  <NewsFilterInput
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                  />
                  {categorySearch && (
                    <FiX
                      size={16}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#aaa',
                      }}
                      onClick={() => setCategorySearch('')}
                    />
                  )}
                </div>

                {(!categorySearch || !filters.category) && (
                  <NewsFiltersCustomOption
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, category: '' }));
                      setShowCategoryOptions(false);
                    }}
                    $active={!filters.category}
                  >
                    All Categories
                  </NewsFiltersCustomOption>
                )}

                {filteredCategories.map((cat) => (
                  <NewsFiltersCustomOption
                    key={cat}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, category: cat }));
                      setShowCategoryOptions(false);
                    }}
                    $active={filters.category === cat}
                  >
                    {cat}
                  </NewsFiltersCustomOption>
                ))}
              </NewsFiltersCustomOptionsWrapper>
            )}
          </NewsFiltersCustomSelectWrapper>
        </CategoryCol>

        {/* SOURCE */}
        <SourceCol as="div" className="col-xs-12 col-sm-12 col-md-6">
          <NewsFiltersCustomSelectWrapper ref={sourceRef}>
            <NewsFiltersStyledLabel onClick={() => setShowSourceOptions((prev) => !prev)}>
              {filters.source || 'All Sources'}
              {showSourceOptions ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </NewsFiltersStyledLabel>

            {showSourceOptions && (
              <NewsFiltersCustomOptionsWrapper>
                <div style={{ position: 'relative' }}>
                  <NewsFilterInput
                    type="text"
                    placeholder="Search sources..."
                    value={sourceSearch}
                    onChange={(e) => setSourceSearch(e.target.value)}
                  />
                  {sourceSearch && (
                    <FiX
                      size={16}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#aaa',
                      }}
                      onClick={() => setSourceSearch('')}
                    />
                  )}
                </div>

                {(!sourceSearch || !filters.source) && (
                  <NewsFiltersCustomOption
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, source: '' }));
                      setShowSourceOptions(false);
                    }}
                    $active={!filters.source}
                  >
                    All Sources
                  </NewsFiltersCustomOption>
                )}

                {filteredSources.map((src) => (
                  <NewsFiltersCustomOption
                    key={src}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, source: src }));
                      setShowSourceOptions(false);
                    }}
                    $active={filters.source === src}
                  >
                    {src}
                  </NewsFiltersCustomOption>
                ))}
              </NewsFiltersCustomOptionsWrapper>
            )}
          </NewsFiltersCustomSelectWrapper>
        </SourceCol>
      </Row>
    </NewsFiltersWrapper>
  );
}
