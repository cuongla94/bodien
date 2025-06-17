import { Row, Col, Button, Alert } from 'react-bootstrap';
import { CardItem } from 'components/CardItem';
import { BlogFilterControls } from 'components/Blog';

interface AdminBlogListProps {
  filteredBlogs: any[];
  theme: any;
  authenticated: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: any;
  setFilter: (filter: any) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  deleteSuccess: string;
  deleteError: string;
  dismissAlert: (type: 'success' | 'error') => void;
  hitEnd: boolean;
  size: number;
  setSize: (size: number) => void;
  formatDate: (date: string) => string;
}

export const AdminBlogList = ({
  filteredBlogs,
  theme,
  authenticated,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  onEdit,
  onDelete,
  deleteSuccess,
  deleteError,
  dismissAlert,
  hitEnd,
  size,
  setSize,
  formatDate,
}: AdminBlogListProps) => {
  if (!authenticated) return null;

  return (
    <Row className="justify-content-center">
      <Col md={10} className="p-4">
        {deleteSuccess && (
          <Alert variant="success" dismissible onClose={() => dismissAlert('success')}>
            {deleteSuccess}
          </Alert>
        )}

        {deleteError && (
          <Alert variant="danger" dismissible onClose={() => dismissAlert('error')}>
            {deleteError}
          </Alert>
        )}

        <BlogFilterControls
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

        {filteredBlogs.length > 0 ? (
          <>
            <Row>
              {filteredBlogs.map(blog => (
                <Col key={blog._id} lg="4" md="6" className="mb-4">
                  <CardItem
                    title={blog.title}
                    subtitle={blog.subtitle}
                    date={formatDate(blog.publishedAt)}
                    image={blog.coverImage}
                    tags={blog.tags || []}
                    isAdmin={true}
                    onEdit={() => onEdit(blog._id)}
                    onDelete={() => onDelete(blog._id, blog.title)}
                    theme={theme}
                    numOfViews={blog.numOfViews || 0}
                    numOfShares={blog.numOfShares || 0}
                  />
                </Col>
              ))}
            </Row>

            {!hitEnd && (
              <div className="text-center mb-4">
                <Button onClick={() => setSize(size + 1)} variant="outline-secondary" size="lg">
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p>No blogs found.</p>
          </div>
        )}
      </Col>
    </Row>
  );
};
