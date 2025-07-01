import { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { isValidUrl } from 'utils/isValidUrl';
import {
  SectionWrapper,
  ProductImageWrapper,
  ProductImagePreview,
  RemoveIcon,
  UploadPlaceholder,
  InvalidUrlText,
} from './styles';
import { BlogFormSectionsControls } from './BlogFormSectionsControls';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'], // <-- enable image
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
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
  sectionRefs
}) => {
  useEffect(() => {
    const updatedSections = formData.sections.map(section => {
      if (
        section._type === 'content' &&
        !section.description &&
        Array.isArray(section.content)
      ) {
        const htmlString = section.content
          .map(block => block.children?.map(child => child.text).join(''))
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
        const canAdd = section.affiliateLinks?.every(
          link => link.label.trim() && isValidUrl(link.url)
        );

        const imagePreview =
          section.imagePreview || section.image?.asset?.url || '';

        return (
          <SectionWrapper
            key={index}
            ref={el => {
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
  value={section.description || ''}
  onChange={val => updateSection(index, 'description', val)}
  placeholder="Write a product overview here..."
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

            {section._type === 'product' && (
              <>
                <Row className="pt-3 ps-3 pe-3">
                  <Col md={3} className="text-center">
                    <label style={{ cursor: 'pointer', display: 'block' }}>
                      <ProductImageWrapper>
                        {imagePreview ? (
                          <>
                            <ProductImagePreview
                              src={imagePreview}
                              alt="Preview"
                            />
                            <RemoveIcon>
                              <FaTimes
                                size={16}
                                color="red"
                                onClick={() => removeProductImage(index)}
                              />
                            </RemoveIcon>
                          </>
                        ) : (
                          <UploadPlaceholder>
                            <FaPlusCircle size={24} color="red" />
                            <div style={{ marginTop: '6px' }}>Upload Image</div>
                          </UploadPlaceholder>
                        )}
                      </ProductImageWrapper>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e =>
                          e.target.files?.[0] &&
                          handleProductImageChange(index, e.target.files[0])
                        }
                      />
                    </label>
                  </Col>

                  <Col md={9}>
                    <Form.Group className="mb-3">
                      <ReactQuill
                        value={section.description || ''}
                        onChange={val => updateSection(index, 'description', val)}
                        placeholder="Write a product overview here..."
                        modules={quillModules}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="p-3">
                  {section.affiliateLinks.map((link, linkIdx) => (
                    <Row
                      key={linkIdx}
                      className="mb-2 align-items-start position-relative"
                    >
                      <Col>
                        <Form.Control
                          placeholder="Label"
                          value={link.label}
                          onChange={e =>
                            updateAffiliateLink(
                              index,
                              linkIdx,
                              'label',
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col
                        style={{
                          position: 'relative',
                          paddingBottom: '1.3rem',
                        }}
                      >
                        <Form.Control
                          placeholder="https://example.com"
                          value={link.url}
                          onChange={e =>
                            updateAffiliateLink(
                              index,
                              linkIdx,
                              'url',
                              e.target.value
                            )
                          }
                          isInvalid={!isValidUrl(link.url)}
                        />
                        {!isValidUrl(link.url) && (
                          <InvalidUrlText>
                            Please enter a valid URL.
                          </InvalidUrlText>
                        )}
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="outline-danger"
                          onClick={() => removeAffiliateLink(index, linkIdx)}
                        >
                          <FaTimes />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <BlogFormSectionsControls
                    index={index}
                    canAddAffiliateLink={canAdd}
                    addAffiliateLink={addAffiliateLink}
                    removeSection={removeSection}
                    moveSectionUp={moveSectionUp}
                    moveSectionDown={moveSectionDown}
                    totalSections={formData.sections.length}
                  />
                </div>
              </>
            )}
          </SectionWrapper>
        );
      })}
    </>
  );
};
