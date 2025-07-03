import { useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { FaPlusCircle } from 'react-icons/fa';
import { isValidUrl } from 'utils/isValidUrl';
import { BlogFormSectionsControls } from './BlogFormSectionsControls';
import { BlogFormProductSection } from './BlogFormProductSection';
import {
  SectionWrapper,
  RemoveIcon,
  FullWidthWrapper,
  CoverImagePreview,
  UploadArea,
  UploadIconButton,
} from './styles';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
const quillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
  ],
};

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

  if (!formData.sections || formData.sections.length === 0) return null;

  return (
    <>
      {formData.sections.map((section, index) => {
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
            {section._type === 'content' && (
              <Col md={12} className="p-3">
                <Form.Group className="mb-3">
                  <ReactQuill
                    theme="snow"
                    value={section.description || ''}
                    onChange={(val) => updateSection(index, 'description', val)}
                    modules={quillModules}
                    formats={['size', 'bold', 'italic', 'underline', 'list', 'bullet', 'link']}
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
