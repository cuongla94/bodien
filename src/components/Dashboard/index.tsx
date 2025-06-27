import { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useGetBlogsPages } from 'utils/Pagination';
import { BlogList } from 'components/Blogs/BlogList';
import { LatestPosts, BlogsFilterControls } from 'components/Blogs';
import { BlogControlSortOptions } from 'types/blog';

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

  const { data, size, setSize, hitEnd } = isAdmin
    ? useGetBlogsPages({ filter })
    : {
        data: [initialBlogs],
        size: 1,
        setSize: () => {},
        hitEnd: true,
      };

  useEffect(() => {
    setIsFiltering(true);
    const timeout = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortOption, isFeaturedOnly, selectedCategory]);

  const flatBlogs = useMemo(() => data?.flat() || [], [data]);

  const filteredBlogs = flatBlogs
    .filter(blog => !blog.hidden || isAdmin)
    .filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
  const hasMorePosts = !hitEnd && totalBlogs > 3;

  return (
    <>
      {mode === 'public' && flatBlogs.length > 0 && (
        <LatestPosts posts={flatBlogs} theme={theme} />
      )}

      {mode === 'public' && (
        <h2 className="mb-4">All Posts</h2>
      )}

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

          {hasMorePosts && (
            <div className="text-center mb-4">
              <Button
                onClick={() => setSize(size + 1)}
                size="lg"
                variant="outline-secondary"
              >
                Load More ({totalBlogs} posts loaded)
              </Button>
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
            <h4>No Posts Available</h4>
            <p className="text-muted mb-0">
              There are currently no blog posts to display. Please check back later!
            </p>
          </div>
        )
      )}
    </>
  );
};
