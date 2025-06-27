import { useEffect, useState, useMemo, useRef } from 'react';
import { useGetBlogsPages } from 'utils/Pagination';
import { BlogList } from 'components/Blogs/BlogList';
import { LatestPosts, BlogsFilterControls } from 'components/Blogs';
import { BlogControlSortOptions } from 'types/blog';
import { MainDashboard } from 'config/main-config';
import { Spinner } from 'common/Spinner';

interface DashboardProps {
  mode: 'admin' | 'public';
  theme: any;
  preview?: boolean;
  authenticated?: boolean;
  initialBlogs?: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onToggleHidden?: (id: string, hidden: boolean) => void;
  deleteSuccess?: string;
  deleteError?: string;
  dismissAlert?: (type: 'success' | 'error') => void;
}

export const Dashboard = ({
  mode,
  theme,
  authenticated = true,
  initialBlogs = [],
  onEdit,
  onDelete,
  onToggleHidden,
  deleteSuccess,
  deleteError,
  dismissAlert,
}: DashboardProps) => {
  const isAdmin = mode === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ view: { list: 0 }, date: { asc: 0 } });
  const [sortOption, setSortOption] = useState<BlogControlSortOptions>('relevant');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, size, setSize, hitEnd } = useGetBlogsPages({ filter });

  useEffect(() => {
    setIsFiltering(true);
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsFiltering(false);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortOption, isFeaturedOnly, selectedCategory]);

  const flatBlogs = useMemo(() => data?.flat() || [], [data]);

  const filteredBlogs = flatBlogs
    .filter(blog => !blog.hidden || isAdmin)
    .filter(blog => blog.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(blog => (isFeaturedOnly ? blog.featured : true))
    .filter(blog =>
      selectedCategory
        ? typeof blog.category === 'object'
          ? blog.category.value === selectedCategory
          : blog.category?.toLowerCase() === selectedCategory.toLowerCase()
        : true
    )
    .sort((a, b) => {
      switch (sortOption) {
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
        default:
          return 0;
      }
    });

  const totalBlogs = filteredBlogs.length;

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
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [totalBlogs, hitEnd, setSize]);

  return (
    <>
      {mode === 'public' && flatBlogs.length > 0 && (
        <LatestPosts posts={flatBlogs} theme={theme} />
      )}

      {mode === 'public' && <h2 className="mb-4">{MainDashboard.allPostsTitle}</h2>}

      <BlogsFilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
        isFeaturedOnly={isFeaturedOnly}
        onToggleFeatured={() => setIsFeaturedOnly(prev => !prev)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

{isLoading && (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // minHeight: '50vh',
    }}
  >
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
            <p className="mb-0">
              {MainDashboard.noPostAvailableSubtext}
            </p>
          </div>
        )
      )}
    </>
  );
};
