import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';
import { BlogFormData } from 'config/blog-config';
import { isValidUrl } from 'utils/isValidUrl';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
};

export const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'link', 'list', 'bullet'
];

export const BlogCreateForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tags: '',
    sections: [],
    coverImage: null,
    coverPreview: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        coverPreview: previewUrl
      }));
    }
  };

  const addContentSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { type: 'content', description: '' }]
    }));
  };

  const addProductSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        type: 'product',
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
      const section = updated[index];
      const hasEmpty = section.affiliateLinks.some(link => !link.label.trim() || !isValidUrl(link.url));
      if (hasEmpty) return prev;
      section.affiliateLinks = [...section.affiliateLinks, { label: '', url: '' }];
      updated[index] = section;
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
      formDataToSend.append('tags', tags.join(','));
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
        headers: { 'Content-Type': 'multipart/form-data' }
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
      <h2>{BlogFormData.createFormTitle}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

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
          <Form.Label>Tags</Form.Label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
            minHeight: '48px'
          }}>
            {tags.map((tag, idx) => (
              <div key={idx} style={{
                background: '#d1ecf1',
                color: '#0c5460',
                borderRadius: '12px',
                padding: '3px 10px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {tag}
                <FaTimes size={10} style={{ cursor: 'pointer' }} onClick={() => setTags(tags.filter((_, i) => i !== idx))} />
              </div>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  const newTag = tagInput.trim();
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag]);
                    setTagInput('');
                  }
                } else if (e.key === 'Backspace' && !tagInput) {
                  setTags(tags.slice(0, -1));
                }
              }}
              placeholder="Add tag"
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: '#f1f3f5',
                borderRadius: '12px',
                padding: '6px 10px',
                fontSize: '0.85rem',
                minWidth: '100px',
                maxWidth: '160px',
                flexShrink: 0
              }}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
  <Form.Label>Cover Image</Form.Label>
  <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
  
  {formData.coverPreview && (
    <div className="mt-3 position-relative" style={{ maxWidth: '400px' }}>
      <img
        src={formData.coverPreview}
        alt="Cover Preview"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
      <FaTimes
        size={18}
        color="red"
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          cursor: 'pointer',
          backgroundColor: '#fff',
          borderRadius: '50%',
          padding: '2px'
        }}
        onClick={() =>
          setFormData(prev => ({ ...prev, coverImage: null, coverPreview: '' }))
        }
      />
    </div>
  )}
</Form.Group>

        {formData.sections.map((section, index) => {
          const canAdd = section.affiliateLinks?.every(link => link.label.trim() && isValidUrl(link.url));

          return (
            <div key={index} className="border rounded mb-4 position-relative">
              {section.type === 'content' && (
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <div className={styles.contentEditor}>
                      <ReactQuill
                        value={section.description}
                        onChange={(val) => updateSection(index, 'description', val)}
                        placeholder="Write a description..."
                      />
                    </div>
                  </Form.Group>
                </Col>
              )}

              {section.type === 'product' && (
                <>
                  <Row className="pt-3 ps-3 pe-3">
                    <Col md={3} className="text-center">
                      <label style={{ cursor: 'pointer', display: 'block', position: 'relative' }}>
                        <div style={{
                          width: '100%',
                          height: '250px',
                          backgroundColor: '#f9f9f9',
                          borderRadius: '10px',
                          border: '1px dashed #ccc',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          {section.imagePreview ? (
                            <>
                              <img src={section.imagePreview} alt="Preview" style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '10px',
                                display: 'block'
                              }} />
                              <FaTimes size={16} color="red" style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                borderRadius: '50%'
                              }} onClick={() => removeProductImage(index)} />
                            </>
                          ) : (
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              textAlign: 'center',
                              color: '#000'
                            }}>
                              <FaPlusCircle size={24} color="red" />
                              <div style={{ marginTop: '6px', fontWeight: '500' }}>Upload Image</div>
                            </div>
                          )}
                        </div>
                        <input type="file" accept="image/*" style={{ display: 'none' }}
                          onChange={(e) => e.target.files?.[0] && handleProductImageChange(index, e.target.files[0])} />
                      </label>
                    </Col>

                    <Col md={9}>
                      <Form.Group className="mb-3">
                        <div className={styles.editorWrapper}>
                          <ReactQuill
                            value={section.description}
                            onChange={(val) => updateSection(index, 'description', val)}
                            placeholder="Write a product overview here..."
                            modules={quillModules}
                            formats={quillFormats}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="p-3">
                    {section.affiliateLinks.map((link, linkIdx) => (
                      <Row key={linkIdx} className="mb-2 align-items-start position-relative">
                        <Col>
                          <Form.Control
                            placeholder="Label"
                            value={link.label}
                            onChange={(e) => updateAffiliateLink(index, linkIdx, 'label', e.target.value)}
                          />
                        </Col>
                        <Col style={{ position: 'relative', paddingBottom: '1.3rem' }}>
                          <Form.Control
                            placeholder="https://example.com"
                            value={link.url}
                            onChange={(e) => updateAffiliateLink(index, linkIdx, 'url', e.target.value)}
                            isInvalid={!isValidUrl(link.url)}
                          />
                          {!isValidUrl(link.url) && (
                            <div className="text-danger" style={{
                              position: 'absolute',
                              top: '65%',
                              left: '0.9rem',
                              fontSize: '0.8rem'
                            }}>
                              Please enter a valid URL.
                            </div>
                          )}
                        </Col>
                        <Col xs="auto">
                          <Button variant="outline-danger" size="md"
                            onClick={() => removeAffiliateLink(index, linkIdx)}>
                            <FaTimes />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Button size="sm" variant="dark" disabled={!canAdd} onClick={() => addAffiliateLink(index)}>
                          + Add Affiliate Link
                        </Button>
                      </Col>
                      <Col className="text-end">
                        <Button variant="danger" size="md" onClick={() => removeSection(index)}>
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <div className="mb-3 d-flex gap-2">
          <Button variant="success" onClick={addProductSection}>+ Add Product Section</Button>
          <Button variant="primary" onClick={addContentSection}>+ Add Content Section</Button>
        </div>

        <div className="d-flex gap-2 mb-4">
          <Button type="submit" variant="primary" disabled={isSubmitting || !formData.title}>
            Create Blog Post
          </Button>
          <Button variant="outline-secondary" onClick={() => router.push('/admin')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};
