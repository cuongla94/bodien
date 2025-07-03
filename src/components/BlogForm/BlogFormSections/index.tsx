import { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { isValidUrl } from 'utils/isValidUrl';
import {
  SectionWrapper,
  ProductImageWrapper,
  ProductImagePreview,
  RemoveIcon,
  UploadPlaceholder,
  InvalidUrlText,
  FullWidthWrapper,
  CoverImagePreview,
  UploadArea,
  UploadIconButton
} from './styles';
import { BlogFormSectionsControls } from './BlogFormSectionsControls';
import dynamic from 'next/dynamic';
import { BlogFormProductSection } from './BlogFormProductSection';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export const BlogFormSections = ({
  formData,
  updateSection,
  removeSection,
  handleProductImageChange,
  removeProductImage,
  updateAffiliateLink,
  addAffiliateLink,
  removeAffiliateLink,
  moveSectionUp,
  moveSectionDown,
  mode,
  sectionRefs,
}) => {
  useEffect(() => {
    const updatedSections = formData.sections.map((section) => {
      if (
        section._type === 'content' &&
        !section.description &&
        Array.isArray(section.content)
      ) {
        const htmlString = section.content
          .map((block) => block.children?.map((child) => child.text).join(''))
          .join('\n');
        return { ...section, description: htmlString };
      }
      return section;
    });

    const needsUpdate =
      JSON.stringify(updatedSections) !== JSON.stringify(formData.sections);

    if (needsUpdate) {
      updatedSections.forEach((section, index) => {
        updateSection(index, 'description', section.description);
      });
    }
  }, [formData.sections]);

  const quillModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image']
      ],
      handlers: {
        image: function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              const range = this.quill.getSelection();
              const image = `<img src="${reader.result}" style="max-width: 100%; height: auto; resize: both; display: block; margin: 1rem auto;" contenteditable="false" />`;
              this.quill.clipboard.dangerouslyPasteHTML(range?.index || 0, image);
            };
            reader.readAsDataURL(file);
          };
        }
      }
    }
  };

  if (!formData.sections || formData.sections.length === 0) return null;

  return (
    <>
      {formData.sections.map((section, index) => {
        const canAdd = section.affiliateLinks?.every(
          (link) => link.label.trim() && isValidUrl(link.url)
        );

        const imagePreview =
          section.imagePreview || section.image?.asset?.url || '';

        return (
          <SectionWrapper
            key={section.id || index}
            ref={(el) => {
              if (!Array.isArray(sectionRefs.current)) {
                sectionRefs.current = [];
              }
              sectionRefs.current[index] = el || null;
            }}
          >
            {/* Content Section */}
            {section._type === 'content' && (
              <Col md={12} className="p-3">
                <Form.Group className="mb-3">
                  <ReactQuill
                    theme="snow"
                    value={section.description || ''}
                    onChange={(val) => updateSection(index, 'description', val)}
                    modules={quillModules}
                  />
                </Form.Group>
                <BlogFormSectionsControls
                  index={index}
                  removeSection={removeSection}
                  moveSectionUp={moveSectionUp}
                  moveSectionDown={moveSectionDown}
                  totalSections={formData.sections.length}
                  showAffiliateButton={false}
                />
              </Col>
            )}

            {/* Product Section */}
            {section._type === 'product' && (
              <BlogFormProductSection
                section={section}
                index={index}
                updateSection={updateSection}
                handleProductImageChange={handleProductImageChange}
                removeProductImage={removeProductImage}
                updateAffiliateLink={updateAffiliateLink}
                addAffiliateLink={addAffiliateLink}
                removeAffiliateLink={removeAffiliateLink}
                removeSection={removeSection}
                moveSectionUp={moveSectionUp}
                moveSectionDown={moveSectionDown}
                totalSections={formData.sections.length}
              />
            )}

            {/* Image Upload Section */}
            {section._type === 'image' && (
              <Col md={12} className="p-3">
                <Form.Group className="mb-3 w-100" style={{ position: 'relative' }}>
<Form.Control
  type="file"
  accept="image/*"
  id={`image-upload-${index}`}
  style={{ display: 'none' }}
  onChange={(e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updateSection(index, 'image', file);
      updateSection(index, 'imagePreview', previewUrl);
    }
  }}
/>


                  {section.imagePreview ? (
                    <FullWidthWrapper>
                      <label htmlFor={`image-upload-${index}`} style={{ cursor: 'pointer', display: 'block' }}>
                        <CoverImagePreview src={section.imagePreview} alt="Image Preview" />
                      </label>

                      <RemoveIcon
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateSection(index, 'image', null);
                          updateSection(index, 'imagePreview', '');
                        }}
                      >
                        ×
                      </RemoveIcon>
                    </FullWidthWrapper>
                  ) : (
                    <label htmlFor={`image-upload-${index}`} style={{ cursor: 'pointer', width: '100%' }}>
                      <UploadArea>
                        <UploadIconButton>
                          <FaPlusCircle size={16} color="#fff" />
                        </UploadIconButton>
                        <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
                          Upload Image
                        </div>
                      </UploadArea>
                    </label>
                  )}
                </Form.Group>
                <BlogFormSectionsControls
                  index={index}
                  removeSection={removeSection}
                  moveSectionUp={moveSectionUp}
                  moveSectionDown={moveSectionDown}
                  totalSections={formData.sections.length}
                  showAffiliateButton={false}
                />
              </Col>
            )}
          </SectionWrapper>
        );
      })}
    </>
  );
};
