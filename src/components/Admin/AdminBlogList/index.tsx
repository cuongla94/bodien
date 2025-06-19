// components/Admin/AdminBlogList.tsx
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { BlogFilterControls } from 'components/Blog';
import { CardItem } from 'components/CardItem';
import { Wrapper, MessageBox } from './styles';

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
  onToggleHidden: (id: string, hidden: boolean) => void;
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
  onToggleHidden,
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
    <Wrapper md={12}>
      {deleteSuccess && (
        <Alert
          variant="success"
          dismissible
          onClose={() => dismissAlert('success')}
        >
          {deleteSuccess}
        </Alert>
      )}

      {deleteError && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => dismissAlert('error')}
        >
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
                  onToggleHidden={() => onToggleHidden(blog._id, !blog.hidden)}
                  hidden={blog.hidden}
                  theme={theme}
                  numOfViews={blog.numOfViews || 0}
                  numOfShares={blog.numOfShares || 0}
                />
              </Col>
            ))}
          </Row>

          {!hitEnd && (
            <MessageBox>
              <Button
                onClick={() => setSize(size + 1)}
                variant="outline-secondary"
                size="lg"
              >
                Load More
              </Button>
            </MessageBox>
          )}
        </>
      ) : (
        <MessageBox>
          <p>No blogs found.</p>
        </MessageBox>
      )}
    </Wrapper>
  );
};
