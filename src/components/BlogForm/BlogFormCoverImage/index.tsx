import { Form } from 'react-bootstrap';
import { CoverWrapper, CoverImage, CloseIcon } from './styles';

export const BlogFormCoverImage = ({ formData, setFormData, handleFileChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Cover Image</Form.Label>
    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />

    {formData.coverPreview && (
      <CoverWrapper>
        <CoverImage src={formData.coverPreview} alt="Cover Preview" />
        <CloseIcon
          size={18}
          color="red"
          onClick={() =>
            setFormData(prev => ({ ...prev, coverImage: null, coverPreview: '' }))
          }
        />
      </CoverWrapper>
    )}
  </Form.Group>
);
