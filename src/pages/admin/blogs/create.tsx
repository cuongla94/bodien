import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { BlogCreateForm } from 'components/BlogCreateForm';

export default function CreateBlogPage() {
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
                <Link href="/admin/blogs" className="text-decoration-none text-white">
                  📝 All Blogs
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/blogs/create" className="text-decoration-none text-warning">
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
        <Col md={10} className="p-0">
          <BlogCreateForm />
        </Col>
      </Row>
    </Container>
  );
}