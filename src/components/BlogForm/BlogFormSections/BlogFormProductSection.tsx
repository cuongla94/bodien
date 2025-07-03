import { useMemo } from 'react';
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

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
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
              const image = `<img src="${reader.result}" style="max-width: 100%; height: auto; display: block; margin: 1rem auto;" contenteditable="false" />`;
              this.quill.clipboard.dangerouslyPasteHTML(range?.index || 0, image);
            };
            reader.readAsDataURL(file);
          };
        },
      },
    },
  }), []);

  const affiliateLinks = section.affiliateLinks || [];

  const canAdd = affiliateLinks.every(
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
              onChange={(e) =>
                e.target.files?.[0] && handleProductImageChange(index, e.target.files[0])
              }
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
        {affiliateLinks.map((link, linkIdx) => (
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
