import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { ITheme } from 'types/theme';
import { CardItem } from 'components/CardItem';
import { useGetBlogsPages } from 'common/Pagination';
import { AdminPasswordForm } from 'components/Admin/AdminPasswordForm';
import { useAdminAuth } from 'hooks/useAdminAuth';
import { BlogFilterControls } from 'components/Blog';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { ConfirmationModal } from 'common/modals';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

export default function AdminPage() {
  const router = useRouter();
  const { theme } = useThemeProvider() as { theme: ITheme };
  const { authenticated, loading: authLoading, login, logout } = useAdminAuth();

  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ view: { list: 0 }, date: { asc: 0 } });

  const { data, size, setSize, hitEnd } = useGetBlogsPages({ filter });
  const currentData = data || [[]];
  const filteredBlogs = currentData.flat().filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const [formLoading, setFormLoading] = useState(false);
  const handlePasswordSubmit = (password: string) => {
    setFormLoading(true);
    setError('');
    const success = login(password);
    if (!success) setError('Incorrect password');
    setFormLoading(false);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/blogs/edit/${id}`);
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{ id: string; title: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = (id: string, title: string) => {
    console.log('handleDelete called with:', { id, title });
    console.log('Blog object type:', typeof id, 'Blog title type:', typeof title);
    
    setSelectedBlog({ id, title });
    setShowConfirm(true);
    setDeleteError('');
    setDeleteSuccess('');
    
    console.log('selectedBlog set to:', { id, title });
  };

  const confirmDelete = async () => {
    console.log(`selectedBlog.id: ${selectedBlog.id}`)

    if (!selectedBlog?.id) {
      setDeleteError('No blog selected for deletion.');
      return;
    }
  
    setDeleteLoading(true);
    
    try {
      const response = await axios.delete(`/api/blogs/delete`, {
        params: { id: selectedBlog.id },
      });
  
      const result = response.data;
  
      if (result.success) {
        setDeleteSuccess(`Blog post "${selectedBlog.title}" deleted successfully`);
        setSize(1);
        setTimeout(() => setDeleteSuccess(''), 5000);
      } else {
        throw new Error(result.message || 'Delete operation failed');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
      setDeleteError(`Failed to delete blog post: ${errorMessage}`);
    } finally {
      setDeleteLoading(false);
      setShowConfirm(false);
      setSelectedBlog(null);
    }
  };
  

  const dismissAlert = (type: 'success' | 'error') => {
    if (type === 'success') setDeleteSuccess('');
    if (type === 'error') setDeleteError('');
  };

  if (authLoading) return null;

  return (
    <Container fluid className="py-4">
      <AdminPasswordForm
        show={!authenticated}
        onSubmit={handlePasswordSubmit}
        error={error}
        loading={formLoading}
      />

      {authenticated && (
        <Row className="justify-content-center">
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Admin Dashboard ({filteredBlogs.length})</h1>
                <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => router.push('/admin/blogs/create')}
                  className="d-flex align-items-center gap-2"
                >
                  <FaPlus />
                  Add Blog
                </Button>
                  <Button variant="outline-danger" size="sm" onClick={logout}>
                    🔒 Logout
                  </Button>
                </div>
            </div>

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
                        onEdit={() => handleEdit(blog._id)}
                        onDelete={() => handleDelete(blog._id, blog.title)}
                        theme={theme}
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
      )}

      <ConfirmationModal
        show={showConfirm}
        title="Delete Confirmation"
        message={`Are you sure you want to delete the blog post "${selectedBlog?.title}"? This action cannot be undone.`}
        confirmLabel={deleteLoading ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedBlog(null);
        }}
      />
    </Container>
  );
}