import { useState, useEffect, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BlogFormData } from 'config/blog-config';
import { isValidUrl } from 'utils/isValidUrl';
import 'react-quill/dist/quill.snow.css';
import { BlogFormCoverImage } from './BlogFormCoverImage';
import { BlogFormTags } from './BlogFormTags';
import { BlogFormSections } from './BlogFormSections';
import { BlogFormCategories } from './BlogFormCategories';
import { Toast } from 'common/Toast';

export const BlogForm = ({ mode = 'create', initialData = null }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tags: '',
    category: '',
    sections: [],
    coverImage: null,
    coverPreview: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        tags: '',
        category: initialData.category || '',
        sections: (initialData.sections || []).map(section => {
          if (section._type === 'product') {
            return {
              ...section,
              image: section.image || null,
              imagePreview: section.image?.asset?.url || '',
              description: section.description || '',
              affiliateLinks: section.affiliateLinks || [],
            };
          }
          if (section._type === 'content') {
            return {
              ...section,
              description: section.description || '',
            };
          }
          return section;
        }),
        coverImage: null,
        coverPreview: initialData.coverImage || '',
      });
      setTags(initialData.tags || []);
    }
  }, [initialData, mode]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        coverPreview: previewUrl,
      }));
    }
  };

  const addContentSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { _type: 'content', description: '' }],
    }));
    scrollToSection(formData.sections.length);
  };

  const addProductSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          _type: 'product',
          description: '',
          image: null,
          imagePreview: '',
          affiliateLinks: [],
        },
      ],
    }));
    scrollToSection(formData.sections.length);
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[index][field] = value;
      return { ...prev, sections: updated };
    });
  };

  const removeSection = index => {
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

  const removeProductImage = index => {
    updateSection(index, 'image', null);
    updateSection(index, 'imagePreview', '');
  };

  const addAffiliateLink = index => {
    setFormData(prev => {
      const updated = [...prev.sections];
      const section = updated[index];
      const hasEmpty = section.affiliateLinks.some(
        link => !link.label.trim() || !isValidUrl(link.url)
      );
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

  const scrollToSection = index => {
    setTimeout(() => {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const moveSectionUp = index => {
    if (index <= 0) return;
    const newSections = [...formData.sections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    setFormData({ ...formData, sections: newSections });
    scrollToSection(index - 1);
  };

  const moveSectionDown = index => {
    if (index >= formData.sections.length - 1) return;
    const newSections = [...formData.sections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    setFormData({ ...formData, sections: newSections });
    scrollToSection(index + 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('tags', tags.join(','));
      formDataToSend.append('category', formData.category);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const serializedSections = formData.sections.map((section, i) => {
        if (section._type === 'product' && section.image) {
          formDataToSend.append(`productImage-${i}`, section.image);
        }
        return section;
      });

      formDataToSend.append('sections', JSON.stringify(serializedSections));

      if (mode === 'edit' && initialData?._id) {
        await axios.put(`/api/blogs/edit/${initialData._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setToast({ type: 'success', message: 'Blog post updated successfully!' });
      } else {
        await axios.post('/api/blogs/create', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setToast({ type: 'success', message: 'Blog post created successfully!' });
      }

      setTimeout(() => router.push('/admin'), 2000);
    } catch (err) {
      setToast({ type: 'error', message: 'An error occurred while submitting.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        {mode === 'edit' ? BlogFormData.editFormTitle : BlogFormData.createFormTitle}
      </h2>

      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

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

        <div className="d-flex gap-4 mb-4 align-items-start flex-wrap">
          <div className="flex-grow-1" style={{ minWidth: 250 }}>
            <BlogFormCoverImage
              formData={formData}
              setFormData={setFormData}
              handleFileChange={handleFileChange}
            />
          </div>

          <div className="flex-grow-1" style={{ minWidth: 250 }}>
            <BlogFormCategories
              editCategory={formData.category}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            />
            <BlogFormTags
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
            />
          </div>
        </div>

        <BlogFormSections
          formData={formData}
          updateSection={updateSection}
          removeSection={removeSection}
          handleProductImageChange={handleProductImageChange}
          removeProductImage={removeProductImage}
          updateAffiliateLink={updateAffiliateLink}
          addAffiliateLink={addAffiliateLink}
          removeAffiliateLink={removeAffiliateLink}
          moveSectionUp={moveSectionUp}
          moveSectionDown={moveSectionDown}
          mode={mode}
          sectionRefs={sectionRefs}
        />

        <div className="mb-3 d-flex gap-2">
          <Button variant="success" onClick={addProductSection}>
            + Add Product Section
          </Button>
          <Button variant="primary" onClick={addContentSection}>
            + Add Content Section
          </Button>
        </div>

        <div className="d-flex gap-2 mb-4">
          <Button type="submit" variant="primary" disabled={isSubmitting || !formData.title}>
            {mode === 'edit' ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>
          <Button variant="outline-secondary" onClick={() => router.push('/admin')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};
