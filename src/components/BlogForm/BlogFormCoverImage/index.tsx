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
    <Form.Group className="mb-3 w-100">
      <Form.Control
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="cover-upload"
        style={{ display: 'none' }}
      />

      <label htmlFor="cover-upload" style={{ cursor: 'pointer', width: '100%' }}>
        {formData.coverPreview ? (
          <FullWidthWrapper>
            <CoverImagePreview src={formData.coverPreview} alt="Cover Preview" />
            <RemoveIcon onClick={removeCoverImage}>×</RemoveIcon>
          </FullWidthWrapper>
        ) : (
          <UploadArea>
            <UploadIconButton>
              <FaPlus size={16} color="#fff" />
            </UploadIconButton>
            <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
              Upload Cover Image
            </div>
          </UploadArea>
        )}
      </label>
    </Form.Group>
  );
};
