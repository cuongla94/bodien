import { Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import {
  FullWidthWrapper,
  CoverImagePreview,
  UploadArea,
  UploadIconButton,
  RemoveIcon
} from './styles';

export const BlogFormCoverImage = ({ formData, setFormData, handleFileChange }) => {
  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null, coverPreview: '' }));
  };

  return (
    <Form.Group className="mb-3 w-100" style={{ position: 'relative' }}>
      <Form.Control
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="cover-upload"
        style={{ display: 'none' }}
      />

      {formData.coverPreview ? (
        <FullWidthWrapper>
          {/* Only the image is wrapped in the label */}
          <label htmlFor="cover-upload" style={{ cursor: 'pointer', display: 'block' }}>
            <CoverImagePreview src={formData.coverPreview} alt="Cover Preview" />
          </label>

          {/* Remove button OUTSIDE the label, absolutely positioned */}
          <RemoveIcon
            onClick={(e) => {
              e.preventDefault(); // Prevent label activation
              e.stopPropagation();
              removeCoverImage();
            }}
          >
            ×
          </RemoveIcon>
        </FullWidthWrapper>
      ) : (
        <label htmlFor="cover-upload" style={{ cursor: 'pointer', width: '100%' }}>
          <UploadArea>
            <UploadIconButton>
              <FaPlus size={16} color="#fff" />
            </UploadIconButton>
            <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
              Upload Cover Image
            </div>
          </UploadArea>
        </label>
      )}
    </Form.Group>
  );
};
