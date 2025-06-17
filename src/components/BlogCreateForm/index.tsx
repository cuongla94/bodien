import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AdminControls } from 'components/Admin/AdminControls';
import { FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export const BlogCreateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tags: '',
    sections: [],
    coverImage: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const addContentSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { type: 'content', value: '' }]
    }));
  };

  const addProductSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        type: 'product',
        name: '',
        subtitle: '',
        description: '',
        image: null,
        imagePreview: '',
        affiliateLinks: []
      }]
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[index][field] = value;
      return { ...prev, sections: updated };
    });
  };

  const removeSection = (index) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated.splice(index, 1);
      return { ...prev, sections: updated };
    });
  };

  const handleProductImageChange = (index, file) => {
    const previewUrl = URL.createObjectURL(file);
    updateSection(index, 'image', file);
    updateSection(index, 'imagePreview', previewUrl);
  };

  const removeProductImage = (index) => {
    updateSection(index, 'image', null);
    updateSection(index, 'imagePreview', '');
  };

  const addAffiliateLink = (index) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[index].affiliateLinks.push({ label: '', url: '' });
      return { ...prev, sections: updated };
    });
  };

  const updateAffiliateLink = (sectionIdx, linkIdx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[sectionIdx].affiliateLinks[linkIdx][field] = value;
      return { ...prev, sections: updated };
    });
  };

  const removeAffiliateLink = (sectionIdx, linkIdx) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[sectionIdx].affiliateLinks.splice(linkIdx, 1);
      return { ...prev, sections: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('tags', formData.tags);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const serializedSections = formData.sections.map((section, i) => {
        if (section.type === 'product' && section.image) {
          formDataToSend.append(`productImage-${i}`, section.image);
        }
        return section;
      });

      formDataToSend.append('sections', JSON.stringify(serializedSections));

      await axios.post('/api/blogs/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Blog post created successfully!');
      setTimeout(() => router.push('/admin'), 2000);
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <AdminControls onLogout={logout}/>
      <h2>Create New Blog Post</h2>
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
          <Form.Label>Tags</Form.Label>
          <Form.Control type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {formData.sections.map((section, index) => (
          <div key={index} className="border p-3 rounded mb-4 position-relative">
            {section.type === 'content' && (
              <ReactQuill value={section.value} onChange={(val) => updateSection(index, 'value', val)} />
            )}
            {section.type === 'product' && (
              <Row>
                <Col md={4} className="text-center">
                  <label style={{ cursor: 'pointer', display: 'block', position: 'relative' }}>
                    <div style={{ width: '100%', paddingTop: '75%', position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px', border: '1px dashed #ccc' }}>
                      {section.imagePreview ? (
                        <>
                          <img src={section.imagePreview} alt="Preview" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', maxWidth: '120px', maxHeight: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                          <FaTimes size={16} color="red" style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer', backgroundColor: 'white', borderRadius: '50%' }} onClick={() => removeProductImage(index)} />
                        </>
                      ) : (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#000' }}>
                          <FaPlusCircle size={24} color="red" />
                          <div style={{ marginTop: '6px', fontWeight: '500' }}>Upload Image</div>
                        </div>
                      )}
                    </div>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleProductImageChange(index, e.target.files[0])} />
                  </label>
                </Col>
                <Col md={8}>
                  <Form.Group className="mb-2">
                    <Form.Control placeholder="Product Name" value={section.name} onChange={(e) => updateSection(index, 'name', e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control placeholder="Subtitle" value={section.subtitle} onChange={(e) => updateSection(index, 'subtitle', e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control as="textarea" placeholder="Product Description" value={section.description} onChange={(e) => updateSection(index, 'description', e.target.value)} />
                  </Form.Group>

                  {section.affiliateLinks.map((link, linkIdx) => (
                    <Row key={linkIdx} className="mb-2 align-items-center">
                      <Col><Form.Control placeholder="Label" value={link.label} onChange={(e) => updateAffiliateLink(index, linkIdx, 'label', e.target.value)} /></Col>
                      <Col><Form.Control placeholder="URL" value={link.url} onChange={(e) => updateAffiliateLink(index, linkIdx, 'url', e.target.value)} /></Col>
                      <Col xs="auto">
                        <Button variant="outline-danger" size="sm" onClick={() => removeAffiliateLink(index, linkIdx)}><FaTimes /></Button>
                      </Col>
                    </Row>
                  ))}
                  <Button size="sm" variant="dark" onClick={() => addAffiliateLink(index)}>+ Add Affiliate Link</Button>
                </Col>
              </Row>
            )}
            <Button variant="danger" size="sm" style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={() => removeSection(index)}>
              <FaTrash />
            </Button>
          </div>
        ))}

        <div className="mb-3 d-flex gap-2">
          <Button variant="success" onClick={addProductSection}>+ Add Product Section</Button>
          <Button variant="primary" onClick={addContentSection}>+ Add Content Section</Button>
        </div>

        <div className="d-flex gap-2 mb-4">
          <Button type="submit" variant="primary" disabled={isSubmitting || !formData.title}>Create Blog Post</Button>
          <Button variant="outline-secondary" onClick={() => router.push('/admin')}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
};
