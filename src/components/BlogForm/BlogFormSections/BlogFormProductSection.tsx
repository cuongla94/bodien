import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import {
  ProductImageWrapper,
  ProductImagePreview,
  RemoveIcon,
  UploadPlaceholder,
  InvalidUrlText,
} from './styles';
import { BlogFormSectionsControls } from './BlogFormSectionsControls';
import { isValidUrl } from 'utils/isValidUrl';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const quillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
  ],
};

export const BlogFormProductSection = ({
  index,
  section,
  updateSection,
  removeSection,
  moveSectionUp,
  moveSectionDown,
  totalSections,
  handleProductImageChange,
  removeProductImage,
  updateAffiliateLink,
  addAffiliateLink,
  removeAffiliateLink,
}) => {
  const imagePreview = section.imagePreview || section.image?.asset?.url || '';

  const canAdd = section.affiliateLinks?.every(
    (link) => link.label.trim() && isValidUrl(link.url)
  );

  return (
    <>
      <Row className="pt-3 ps-3 pe-3">
        <Col md={5} className="text-center">
          <label style={{ cursor: 'pointer', display: 'block' }}>
            <ProductImageWrapper>
              {imagePreview ? (
                <>
                  <ProductImagePreview src={imagePreview} alt="Preview" />
                  <RemoveIcon>
                    <FaTimes size={16} color="red" onClick={() => removeProductImage(index)} />
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
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) handleProductImageChange(index, file);
              }}
            />
          </label>
        </Col>

        <Col md={7}>
          <Form.Group className="mb-3">
            <ReactQuill
              theme="snow"
              value={section.description || ''}
              onChange={(val) => updateSection(index, 'description', val)}
              modules={quillModules}
            />
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
                onChange={(e) =>
                  updateAffiliateLink(index, linkIdx, 'label', e.target.value)
                }
              />
            </Col>
            <Col style={{ position: 'relative', paddingBottom: '1.3rem' }}>
              <Form.Control
                placeholder="https://example.com"
                value={link.url}
                onChange={(e) =>
                  updateAffiliateLink(index, linkIdx, 'url', e.target.value)
                }
                isInvalid={!isValidUrl(link.url)}
              />
              {!isValidUrl(link.url) && (
                <InvalidUrlText>Please enter a valid URL.</InvalidUrlText>
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
          totalSections={totalSections}
        />
      </div>
    </>
  );
};
