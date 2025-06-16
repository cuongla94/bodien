import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { ITheme } from 'types/theme';
import { CardItem } from 'components/CardItem';
import { useGetBlogsPages } from 'common/Pagination';
import { AdminPasswordForm } from 'components/Admin/AdminPasswordForm'; // ✅ use correct path
import { useAdminAuth } from 'hooks/useAdminAuth';
import { BlogFilterControls } from 'components/Blog';
import { useThemeProvider } from 'hooks/useThemeProvider';

export default function AdminPage() {
  const router = useRouter();
  const { theme } = useThemeProvider() as { theme: ITheme };
  const { authenticated, loading: authLoading, login, logout } = useAdminAuth();

  const [error, setError] = useState('');
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

  if (authLoading) return null; // optional: show a loader

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
              <Button variant="primary" onClick={() => router.push('/admin/blogs/create')}>
                ➕ Add Blog
              </Button>
              <Button variant="outline-danger" size="sm" onClick={logout}>
                🔒 Logout
              </Button>
            </div>
            <BlogFilterControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortAsc={!!filter.date.asc}
              onToggleSort={() =>
                setFilter((prev) => ({
                  ...prev,
                  date: { asc: prev.date.asc ? 0 : 1 }
                }))
              }
            />
            {filteredBlogs.length > 0 ? (
              <>
                <Row>
                  {filteredBlogs.map((blog) => (
                    <Col key={blog._id} lg="4" md="6" className="mb-4">
                      <CardItem
                        title={blog.title}
                        subtitle={blog.subtitle}
                        date={formatDate(blog.publishedAt)}
                        image={blog.coverImage}
                        link={{ href: `/admin/blogs/edit/${blog._id}` }}
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
                <Button onClick={() => router.push('/admin/blogs/create')} variant="primary">
                  Create Your First Blog
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}
