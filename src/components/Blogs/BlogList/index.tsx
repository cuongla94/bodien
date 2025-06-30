import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CardItem } from 'components/CardItem';
import { Wrapper, MessageBox } from './styles';
import { Toast } from 'common/Toast';
import { AppLinks } from 'config/navigation-config';
import { IBlogListProps, IBlogPost } from 'types/blog';
import { getFormattedDate } from 'utils/dates';

export const BlogList = ({
  data = [],
  theme,
  isAdmin = false,
  authenticated = true,
  onEdit = () => {},
  onDelete = () => {},
  onToggleHidden = () => {},
  deleteSuccess,
  deleteError,
  dismissAlert = () => {},
  hitEnd = true,
  size = 1,
  setSize = () => {},
}: IBlogListProps) => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const blogs = Array.isArray(data[0]) ? data.flat() : data;

  useEffect(() => {
    if (deleteSuccess) {
      setToast({ type: 'success', message: deleteSuccess });
      dismissAlert('success');
    }
    if (deleteError) {
      setToast({ type: 'error', message: deleteError });
      dismissAlert('error');
    }
  }, [deleteSuccess, deleteError, dismissAlert]);

  if (isAdmin && !authenticated) return null;

  return (
    <Wrapper md={12}>
      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {blogs.length > 0 ? (
        <>
          <Row>
            {blogs.map((blog) => {
              console.log('Rendering blog:', blog);
              return (
                <Col key={blog._id || blog.slug} lg="4" md="6" className="mb-4">
                  <CardItem
                    title={blog.title}
                    category={blog.category}
                    publishedDate={getFormattedDate(blog)}
                    updatedDate={blog._updatedAt}
                    image={blog.coverImage}
                    url={isAdmin ? undefined : `${AppLinks.blogs.link}/${blog.slug}`}
                    tags={blog.tags || []}
                    isAdmin={isAdmin}
                    onEdit={isAdmin ? () => onEdit(blog._id!) : undefined}
                    onDelete={isAdmin ? () => onDelete(blog._id!, blog.title) : undefined}
                    onToggleHidden={
                      isAdmin ? () => onToggleHidden(blog._id!, !blog.hidden) : undefined
                    }
                    hidden={isAdmin ? blog.hidden : undefined}
                    theme={theme}
                    numOfViews={blog.numOfViews || 0}
                    numOfShares={blog.numOfShares || 0}
                  />
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <MessageBox>
          <p>No blogs found.</p>
        </MessageBox>
      )}
    </Wrapper>
  );
};
