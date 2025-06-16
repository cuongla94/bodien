import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  subtitle?: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  tags?: string[];
}

export default function AdminBlogsList() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
          <h4 className="mb-4">Admin</h4>
          <nav>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/admin" className="text-decoration-none text-white">
                  📊 Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/blogs" className="text-decoration-none text-warning">
                  📝 All Blogs
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/blogs/create" className="text-decoration-none text-white">
                  ➕ New Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="text-decoration-none text-white">
                  🌐 View Site
                </Link>
              </li>
            </ul>
          </nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>All Blogs ({filteredBlogs.length})</h1>
            <Button variant="primary" onClick={() => router.push('/admin/blogs/create')}>
              Create New Blog
            </Button>
          </div>

          {/* Search */}
          <Card className="mb-4">
            <Card.Body>
              <Form.Control
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Card.Body>
          </Card>

          {/* Blogs Table */}
          <Card>
            <Card.Body>
              {loading ? (
                <p>Loading...</p>
              ) : filteredBlogs.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Tags</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>
                          <strong>{blog.title}</strong>
                          {blog.subtitle && (
                            <div className="text-muted small">{blog.subtitle}</div>
                          )}
                        </td>
                        <td>{formatDate(blog.publishedAt)}</td>
                        <td>
                          {blog.tags?.map((tag, index) => (
                            <span key={index} className="badge bg-secondary me-1">
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/admin/blogs/edit/${blog._id}`}
                              className="btn btn-outline-primary"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/blog/${blog.slug.current}`}
                              className="btn btn-outline-secondary"
                              target="_blank"
                            >
                              View
                            </Link>
                            <Button
                              variant="outline-danger"
                              onClick={() => deleteBlog(blog._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p>No blogs found.</p>
                  <Button variant="primary" onClick={() => router.push('/admin/blogs/create')}>
                    Create Your First Blog
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}