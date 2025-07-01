import { useState, useEffect, useRef } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BlogFormData } from 'config/blog-config';
import { isValidUrl } from 'utils/isValidUrl';
import { BlogFormCoverImage } from './BlogFormCoverImage';
import { BlogFormTags } from './BlogFormTags';
import { BlogFormSections } from './BlogFormSections';
import { BlogFormCategories } from './BlogFormCategories';
import { Toast } from 'common/Toast';
import { BlogFormPreview } from './BlogFormPreview'; // <-- NEW IMPORT
import { BlogFormControlButtons } from './BlogFormControlButton';
import { AdminLinks } from 'config/admin-config';

interface BlogFormProps {
  mode: 'create' | 'edit',
  initialData?: any
}
export const BlogForm = ({ mode = 'create', initialData = null }: BlogFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    category: { title: '', value: '' },
    sections: [],
    coverImage: null,
    coverPreview: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // <-- NEW STATE
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || { title: '', value: '' },
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
        coverPreview: initialData.coverImage?.asset?.url || '',
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

  const addImageSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          _type: 'image',
          image: null,
          imagePreview: '',
          description: '',
        },
      ],
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

  const isFormValid = () => {
  return (
    formData.title.trim().length > 0 &&
    formData.category?.value?.trim().length > 0
  );
};


  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', JSON.stringify(formData.category));
      formDataToSend.append('hidden', 'false');
      formDataToSend.append('tags', tags.join(','));

      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const serializedSections = formData.sections.map((section, index) => {
        const base = {
          _type: section._type,
          description: section.description || '',
        };

        if (section._type === 'product') {
          if (section.image) {
            formDataToSend.append(`productImage-${index}`, section.image);
          }
          return {
            ...base,
            name: section.name || '',
            affiliateLinks: section.affiliateLinks || [],
            imagePreview: section.imagePreview || '',
          };
        }

        return base;
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
      console.error('❌ Form submit error:', err);
      setToast({ type: 'error', message: 'An error occurred while submitting.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        {mode === 'edit' ? `${BlogFormData.editFormTitle} Id ${initialData?._id}` : BlogFormData.createFormTitle}
      </h2>

      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={7}>
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

            <BlogFormCategories
              editCategory={formData.category}
              onChange={(categoryObj) =>
                setFormData(prev => ({ ...prev, category: categoryObj }))
              }
            />

            <BlogFormTags
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
            />
          </Col>

          <Col md={5}>
            <BlogFormCoverImage
              formData={formData}
              setFormData={setFormData}
              handleFileChange={handleFileChange}
            />
          </Col>
        </Row>
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
        <hr className="mt-5" />
       <BlogFormControlButtons
          addProductSection={addProductSection}
          addContentSection={addContentSection}
          addImageSection={addImageSection}
          setIsPreviewOpen={setIsPreviewOpen}
          isSubmitting={isSubmitting}
          formTitle={formData.title}
          mode={mode}
          onCancel={() => router.push(`${AdminLinks.adminDashboard}`)}
          isFormValid={isFormValid()}
        />
      </Form>

      {/* Blog Preview Modal */}
      <BlogFormPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formData={formData}
      />
    </Container>
  );
};
