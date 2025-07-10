import { useEffect, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogList } from './BlogList';
import { BlogsFilterControls } from './BlogsFilterControls';
import { Spinner } from 'common/Spinner';
import { MainDashboard } from 'config/main-config';
import { useGetBlogsPages } from 'hooks/blogHooks/useGetBlogPages';
import { BlogControlSortOptions } from 'types/blog';
import { slugify } from 'utils/slugify';
import { useRouter } from 'next/router';
import { BlogControls } from 'config/blog-config';

interface BlogsProps {
  isAdmin?: boolean;
  theme?: any;
  authenticated?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onToggleHidden?: (id: string, hidden: boolean) => void;
  deleteSuccess?: string;
  deleteError?: string;
  dismissAlert?: (type: 'success' | 'error') => void;
}

export const Blogs = ({
  isAdmin = false,
  theme,
  authenticated,
  onEdit,
  onDelete,
  onToggleHidden,
  deleteSuccess,
  deleteError,
  dismissAlert,
}: BlogsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ view: { list: 0 }, date: { asc: 0 } });
  const [sortOption, setSortOption] = useState<BlogControlSortOptions>('relevant');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, size, setSize, hitEnd } = useGetBlogsPages({ filter });

  useEffect(() => {
    const sort = searchParams.get('sort');
    const category = searchParams.get('category');

    const validSortOptions = BlogControls.sorts.map((s) => s.value);
    if (sort && validSortOptions.includes(sort)) {
      setSortOption(sort as BlogControlSortOptions);
    }

    if (category) {
      setSelectedCategory(category.replace(/_/g, ' '));
    }
  }, [searchParams]);

  const flatBlogs = useMemo(() => data?.flat() || [], [data]);

  const effectiveSortOption =
    selectedCategory && sortOption === 'relevant' ? 'date_desc' : sortOption;

  const filteredBlogs = flatBlogs
    .filter(blog => {
      if (showHidden) return blog.hidden === true;
      return !blog.hidden || isAdmin;
    })
    .filter(blog => blog.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(blog => {
      if (!selectedCategory || selectedCategory === 'all') return true;

      const blogCategory =
        typeof blog.category === 'object'
          ? blog.category?.value?.toLowerCase()
          : blog.category?.toLowerCase();

      return slugify(blogCategory || '') === selectedCategory.toLowerCase();
    })
    .sort((a, b) => {
      switch (effectiveSortOption) {
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date_desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'popularity':
          return (b.views || 0) - (a.views || 0);
        case 'relevant':
        default:
          if ((b.views || 0) !== (a.views || 0)) {
            return (b.views || 0) - (a.views || 0);
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const totalBlogs = filteredBlogs.length;

  useEffect(() => {
    setIsFiltering(true);
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsFiltering(false);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortOption, selectedCategory, showHidden]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;
        const isFullBatchLoaded = totalBlogs > 0 && totalBlogs % MainDashboard.numsOfPost === 0;

        if (isVisible && isFullBatchLoaded && !hitEnd) {
          setSize(prev => prev + 1);
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [totalBlogs, hitEnd, setSize]);

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);

    const params = new URLSearchParams(searchParams);
    if (val) {
      const slug = slugify(val);
      params.set('category', slugify(val))
    } else {
      params.delete('category');
    }

    router.replace(`/app/blogs?${params.toString()}`, undefined, { shallow: true });
  };

  const handleSortChange = (val: string) => {
    setSortOption(val as BlogControlSortOptions);

    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('sort', val);
    } else {
      params.delete('sort');
    }

    router.replace(`/app/blogs?${params.toString()}`, undefined, { shallow: true });
  };


  return (
    <>
      <BlogsFilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        showHidden={showHidden}
        onToggleHidden={() => setShowHidden(prev => !prev)}
      />

      {isLoading && (
        <div className="d-flex justify-content-center align-item-center my-4">
          <Spinner color={theme?.spinnerColor || '#999'} size={28} />
        </div>
      )}

      {totalBlogs > 0 ? (
        <>
          <BlogList
            data={filteredBlogs}
            theme={theme}
            isAdmin={isAdmin}
            authenticated={authenticated}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleHidden={onToggleHidden}
            deleteSuccess={deleteSuccess}
            deleteError={deleteError}
            dismissAlert={dismissAlert}
            hitEnd={hitEnd}
            size={size}
            setSize={setSize}
          />

          {!hitEnd && totalBlogs % MainDashboard.numsOfPost === 0 && (
            <div className="text-center my-4" ref={loadMoreRef}>
              <p className="text-muted">Loading More Posts...</p>
            </div>
          )}

          {hitEnd && totalBlogs > 1 && (
            <div className="text-center mb-4">
              <p className="text-muted small">All {totalBlogs} posts loaded</p>
            </div>
          )}
        </>
      ) : (
        !isFiltering && (
          <div className="text-center py-5">
            <h4>{MainDashboard.noPostAvailableText}</h4>
            <p className="mb-0">{MainDashboard.noPostAvailableSubtext}</p>
          </div>
        )
      )}
    </>
  );
};
