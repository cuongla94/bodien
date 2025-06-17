import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AdminControls } from 'components/Admin/AdminControls';
import { FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';
import { IBlogFormData } from 'types/blog';
import { IProductSection } from 'types/product';
import { IFormAffiliateLink } from 'types/affiliate';

export const BlogCreateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<IBlogFormData>({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    tags: '',
    products: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    router.push('/');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleProductImageChange = (index: number, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index].image = file;
      updated[index].imagePreview = previewUrl;
      return { ...prev, products: updated };
    });
  };

  const removeProductImage = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index].image = undefined;
      updated[index].imagePreview = undefined;
      return { ...prev, products: updated };
    });
  };

  const updateProductField = (index: number, field: keyof IProductSection, value: any) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index][field] = value;
      return { ...prev, products: updated };
    });
  };

  const addAffiliateLink = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index].affiliateLinks.push({ label: '', url: '' });
      return { ...prev, products: updated };
    });
  };

  const removeAffiliateLink = (index: number, linkIdx: number) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index].affiliateLinks.splice(linkIdx, 1);
      return { ...prev, products: updated };
    });
  };

  const updateAffiliateLink = (index: number, linkIndex: number, field: keyof IFormAffiliateLink, value: string) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index].affiliateLinks[linkIndex][field] = value;
      return { ...prev, products: updated };
    });
  };

  const addProductSection = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', description: '', affiliateLinks: [] }],
    }));
  };

  const removeProductSection = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.products];
      updated.splice(index, 1);
      return { ...prev, products: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'coverImage' && value instanceof File) {
          formDataToSend.append('coverImage', value);
        } else if (key === 'products') {
          formDataToSend.append('products', JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      const response = await axios.post('/api/blogs/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      setSuccess('Blog post created successfully!');
      setTimeout(() => router.push('/admin/blogs'), 2000);
    } catch (err: any) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', padding: '0' }}>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            <AdminControls total={0} onLogout={logout} />

            <h2 className="mb-4">Create New Blog Post</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control as="textarea" rows={10} name="content" value={formData.content} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Cover Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>

              <h4 className="mt-5 mb-3">Product Sections</h4>
              {formData.products.map((product, index) => (
                <Form.Group key={index} className="border p-3 rounded mb-4">
                  <Row className="align-items-start">
                    <Col md={4} className="text-center">
                      <label style={{ cursor: 'pointer', display: 'block', position: 'relative' }}>
                        <div style={{ width: '100%', paddingTop: '100%', position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px', border: '1px dashed #ccc' }}>
                          {product.imagePreview ? (
                            <>
                              <img src={product.imagePreview} alt="Product Preview" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                              <FaTimes size={20} color="red" style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer', backgroundColor: 'white', borderRadius: '50%' }} onClick={() => removeProductImage(index)} />
                            </>
                          ) : (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#000' }}>
                              <FaPlusCircle size={32} color="red" />
                              <div style={{ marginTop: '8px', fontWeight: '500' }}>Upload Image</div>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => e.target.files?.[0] && handleProductImageChange(index, e.target.files[0])}
                        />
                      </label>
                    </Col>

                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={product.name} onChange={(e) => updateProductField(index, 'name', e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={product.description} onChange={(e) => updateProductField(index, 'description', e.target.value)} />
                      </Form.Group>

                      {product.affiliateLinks.map((link, linkIdx) => (
                        <Row key={linkIdx} className="mb-2 align-items-center">
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Label (e.g., Amazon)"
                              value={link.label}
                              onChange={(e) => updateAffiliateLink(index, linkIdx, 'label', e.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="URL"
                              value={link.url}
                              onChange={(e) => updateAffiliateLink(index, linkIdx, 'url', e.target.value)}
                            />
                          </Col>
                          <Col xs="auto">
                            <Button variant="danger" size="sm" onClick={() => removeAffiliateLink(index, linkIdx)}>
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button size="sm" variant="dark" onClick={() => addAffiliateLink(index)}>
                        + Add Affiliate Link
                      </Button>
                    </Col>
                  </Row>

                  <div className="mt-3 text-end">
                    <Button variant="danger" size="sm" onClick={() => removeProductSection(index)}>
                      Remove Section
                    </Button>
                  </div>
                </Form.Group>
              ))}

              <Button variant="success" className="mb-4" onClick={addProductSection}>
                + Add Product Section
              </Button>

              <div className="d-flex gap-2 mb-4">
                <Button type="submit" variant="primary" disabled={isSubmitting || !formData.title || !formData.content}>
                  {isSubmitting ? 'Creating...' : 'Create Blog Post'}
                </Button>
                <Button variant="outline-secondary" onClick={() => router.push('/admin/blogs')}>
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
