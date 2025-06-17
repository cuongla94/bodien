import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface BlogData {
  _id: string;
  title: string;
  subtitle: string;
  content: any[];
  excerpt: string;
  tags: string[];
  coverImage?: any;
}

interface FormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  tags: string;
  coverImage?: File;
}

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setBlog(data.blog);
        // Convert Sanity blocks back to plain text
        const contentText = data.blog.content
          ?.map((block: any) => 
            block.children?.map((child: any) => child.text).join('') || ''
          )
          .join('\n\n') || '';
          
        setFormData({
          title: data.blog.title || '',
          subtitle: data.blog.subtitle || '',
          content: contentText,
          excerpt: data.blog.excerpt || '',
          tags: data.blog.tags?.join(', ') || '',
        });
      } else {
        setError('Blog not found');
      }
    } catch (error) {
      setError('Error loading blog');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('tags', formData.tags);
      
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Blog updated successfully!');
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setError(result.error || 'Failed to update blog');
      }
    } catch (err) {
      setError('An error occurred while updating the blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Main Content */}
        <Col md={10}>
          <div style={{ height: '100vh', overflowY: 'auto', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Edit Blog Post</h1>
              <Link href="/admin" className="btn btn-outline-secondary">
                Back to Blogs
              </Link>
            </div>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            {blog && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Excerpt</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    style={{ minHeight: '400px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Leave empty to keep current image
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={saving || !formData.title || !formData.content}
                  >
                    {saving ? 'Updating...' : 'Update Blog Post'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => router.push('/admin')}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}