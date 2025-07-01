import { Button } from 'react-bootstrap';
import { FiEye } from 'react-icons/fi';
import { AdminBlogForm } from 'config/admin-config';
import { AnimatedButton } from 'common/AnimatedButton';

interface BlogFormControlButtonsProps {
  addProductSection: () => void;
  addContentSection: () => void;
  addImageSection: () => void;
  setIsPreviewOpen: (isOpen: boolean) => void;
  isSubmitting: boolean;
  formTitle: string;
  mode: 'create' | 'edit';
  onCancel: () => void;
  isFormValid: boolean;
}

export const BlogFormControlButtons = ({
  addProductSection,
  addContentSection,
  addImageSection,
  setIsPreviewOpen,
  isSubmitting,
  formTitle,
  mode,
  onCancel,
  isFormValid
}: BlogFormControlButtonsProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex gap-2 flex-wrap">
        <AnimatedButton
          baseColor="white"
          hoverColor="black"
          textColor="black"
          borderColor="black"
          hoverTextColor="white"
          onClick={addProductSection}
        >
          + {AdminBlogForm.controls.addProductReviews}
        </AnimatedButton>

        <AnimatedButton
          baseColor="white"
          hoverColor="black"
          textColor="black"
          borderColor="black"
          hoverTextColor="white"
          onClick={addContentSection}
        >
          + {AdminBlogForm.controls.addText}
        </AnimatedButton>

        <AnimatedButton
          baseColor="white"
          hoverColor="black"
          textColor="black"
          borderColor="black"
          hoverTextColor="white"
          onClick={addImageSection}
        >
          + {AdminBlogForm.controls.addImage}
        </AnimatedButton>

        <AnimatedButton
            baseColor="#f9c74f"
            hoverColor="white"
            textColor="black"
            hoverTextColor="#f9c74f"
            borderColor="#f9c74f"
            onClick={() => setIsPreviewOpen(true)}
        >
            <FiEye /> {AdminBlogForm.controls.previewBlog}
        </AnimatedButton>
      </div>

      <div className="d-flex gap-2">
        <AnimatedButton
            type="submit"
            baseColor="#007bff"
            hoverColor="white"
            textColor="white"
            hoverTextColor="#007bff"
            borderColor="#007bff"
            disabled={isSubmitting || !isFormValid}
        >
        {mode === 'edit'
            ? AdminBlogForm.controls.updateBlogPost
            : AdminBlogForm.controls.addBlogPost}
        </AnimatedButton>

        <AnimatedButton
            baseColor="#e0e0e0"
            hoverColor="white"
            textColor="black"
            hoverTextColor="#999"
            borderColor="#e0e0e0"
            onClick={onCancel}
        >
        {AdminBlogForm.controls.cancel}
        </AnimatedButton>
      </div>
    </div>
  );
};
