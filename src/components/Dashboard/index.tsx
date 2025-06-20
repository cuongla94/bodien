import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetBlogsPages } from 'utils/Pagination';
import { BlogList } from 'components/Blogs/BlogList';
import { BlogsFilterControls } from 'components/Blogs/BlogsFilterControls';

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

  const { data, size, setSize, hitEnd } = isAdmin
    ? useGetBlogsPages({ filter })
    : {
        data: [initialBlogs],
        size: 1,
        setSize: () => {},
        hitEnd: true,
      };

  const flatBlogs = data?.flat() || [];

  const filteredBlogs = flatBlogs
    .filter(blog => !blog.hidden || isAdmin)
    .filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalBlogs = filteredBlogs.length;
  const hasMorePosts = !hitEnd && totalBlogs > 3;

  return (
    <>
      <BlogsFilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortAsc={!!filter.date.asc}
        onToggleSort={() =>
          setFilter(prev => ({
            ...prev,
            date: { asc: prev.date.asc ? 0 : 1 },
          }))
        }
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
        <div className="text-center py-5">
          <h4>No Posts Available</h4>
          <p className="text-muted mb-0">
            There are currently no blog posts to display. Please check back
            later!
          </p>
        </div>
      )}
    </>
  );
};
