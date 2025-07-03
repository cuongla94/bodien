import { FiEye } from 'react-icons/fi';
import { AdminBlogForm } from 'config/admin-config';
import { AnimatedButton } from 'common/AnimatedButton';

interface BlogFormControlButtonsProps {
  addProductSection: () => void;
  addContentSection: () => void;
  addImageSection: () => void;
  isSubmitting: boolean;
  formTitle: string;
  mode: 'create' | 'edit';
  onCancel: () => void;
  isFormValid: string;
  setIsPreviewOpen: (open: boolean) => void;
}

export const BlogFormControlButtons = ({
  addProductSection,
  addContentSection,
  addImageSection,
  isSubmitting,
  formTitle,
  mode,
  onCancel,
  isFormValid,
  setIsPreviewOpen,
}: BlogFormControlButtonsProps) => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Row 1: Add Buttons */}
      <div className="d-flex gap-2 flex-wrap">
        <AnimatedButton
          type="button"
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
          type="button"
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
          type="button"
          baseColor="white"
          hoverColor="black"
          textColor="black"
          borderColor="black"
          hoverTextColor="white"
          onClick={addImageSection}
        >
          + {AdminBlogForm.controls.addImage}
        </AnimatedButton>
      </div>

      {/* Row 2: Preview + Submit + Cancel */}
      <div className="d-flex gap-2 flex-wrap">
        <AnimatedButton
          type="button"
          baseColor="#f9c74f"
          hoverColor="white"
          textColor="black"
          hoverTextColor="#f9c74f"
          borderColor="#f9c74f"
          onClick={() => setIsPreviewOpen(true)}
        >
          <FiEye /> {AdminBlogForm.controls.previewBlog}
        </AnimatedButton>

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
          type="button"
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
