import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';

interface IBlogFormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  tags: string;
  coverImage?: File;
}

export const BlogCreateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<IBlogFormData>({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle || '');
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt || '');
      formDataToSend.append('tags', formData.tags || '');
      
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      console.log('Submitting form data:', {
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        excerpt: formData.excerpt,
        tags: formData.tags,
        hasImage: !!formData.coverImage
      });

      const response = await axios.post('/api/blogs/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`);
          }
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      setSuccess('Blog post created successfully!');
      setFormData({
        title: '',
        subtitle: '',
        content: '',
        excerpt: '',
        tags: '',
      });
      
      setTimeout(() => {
        router.push('/admin/blogs');
      }, 2000);

    } catch (err) {
      console.error('Submit error:', err);
      
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error status
          const errorMessage = err.response.data?.error || err.response.data?.details || 'Server error occurred';
          setError(`Failed to create blog post: ${errorMessage}`);
        } else if (err.request) {
          // Request was made but no response received
          setError('Network error: Unable to reach the server');
        } else {
          // Something else happened
          setError(`Request error: ${err.message}`);
        }
      } else {
        setError(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      overflowY: 'auto',
      padding: '0'
    }}>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="mb-4">Create New Blog Post</h2>
            
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

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
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
                  placeholder="Enter blog subtitle"
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
                  placeholder="Brief description of the blog post"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here..."
                  required
                  style={{ minHeight: '300px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas (e.g., tech, react, javascript)"
                />
                <Form.Text className="text-muted">
                  Separate multiple tags with commas
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Cover Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Form.Text className="text-muted">
                  Upload a cover image for your blog post (optional)
                </Form.Text>
              </Form.Group>

              <div className="d-flex gap-2 mb-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !formData.title || !formData.content}
                >
                  {isSubmitting ? 'Creating...' : 'Create Blog Post'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => router.push('/admin/blogs')}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};